import { type Response, type Request } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ValidationError } from 'joi'
import logger from '../../logs'
import {
  validateRequest,
  handleValidationError,
  handleServerError
} from '../../utilities/requestHandler'
import { ResponseData } from '../../utilities/response'
import { deleteModuleSchema } from '../../schemas/moduleSchema'
import { IModuleRemoveRequest } from '../../interfaces/module/module.request'
import { ModuleModel } from '../../models/moduleModel'

export const removeModule = async (req: Request, res: Response): Promise<Response> => {
  const { error: validationError, value: queryParams } = validateRequest(
    deleteModuleSchema,
    req.params
  ) as {
    error: ValidationError
    value: IModuleRemoveRequest
  }

  if (validationError) return handleValidationError(res, validationError)

  try {
    const result = await ModuleModel.findOne({
      where: {
        deleted: false,
        id: queryParams.id
      }
    })

    if (result == null) {
      const message = `Module result not found with ID: ${queryParams.id}`
      logger.warn(message)
      return res.status(StatusCodes.NOT_FOUND).json(ResponseData.error({ message }))
    }

    await result.destroy()

    const response = ResponseData.success({
      message: 'Module result deleted successfully'
    })
    logger.info('Module result deleted successfully')
    return res.status(StatusCodes.OK).json(response)
  } catch (serverError) {
    return handleServerError(res, serverError)
  }
}
