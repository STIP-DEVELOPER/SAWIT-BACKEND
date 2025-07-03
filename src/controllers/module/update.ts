import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ValidationError } from 'joi'
import { ResponseData } from '../../utilities/response'
import logger from '../../logs'
import {
  handleValidationError,
  validateRequest,
  handleServerError
} from '../../utilities/requestHandler'
import { updateModuleSchema } from '../../schemas/moduleSchema'
import { IModuleUpdateRequest } from '../../interfaces/module/module.request'
import { ModuleModel } from '../../models/moduleModel'

export const updateModule = async (req: Request, res: Response): Promise<Response> => {
  const { error: validationError, value: validatedData } = validateRequest(
    updateModuleSchema,
    req.body
  ) as {
    error: ValidationError
    value: IModuleUpdateRequest
  }

  if (validationError) return handleValidationError(res, validationError)

  try {
    const [quizResultUpdated] = await ModuleModel.update(validatedData, {
      where: {
        id: validatedData.id,
        deleted: false
      }
    })

    if (quizResultUpdated === 0) {
      const message = `Module result not found with ID: ${validatedData.id}`
      logger.warn(message)
      return res.status(StatusCodes.NOT_FOUND).json(ResponseData.error({ message }))
    }

    logger.info(`Module result with ID ${validatedData.id} updated successfully.`)

    return res.status(StatusCodes.OK).json(
      ResponseData.success({
        message: 'Module updated successfully'
      })
    )
  } catch (error) {
    return handleServerError(res, error)
  }
}
