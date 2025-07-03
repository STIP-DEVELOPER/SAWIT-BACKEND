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
import { findDetailModuleSchema } from '../../schemas/moduleSchema'
import { IModuleFindDetailRequest } from '../../interfaces/module/module.request'
import { ModuleModel } from '../../models/moduleModel'

export const findDetailModule = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { error: validationError, value: queryParams } = validateRequest(
    findDetailModuleSchema,
    req.params
  ) as {
    error: ValidationError
    value: IModuleFindDetailRequest
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

    const response = ResponseData.success({ data: result })
    logger.info('Module result found successfully')
    return res.status(StatusCodes.OK).json(response)
  } catch (serverError) {
    return handleServerError(res, serverError)
  }
}
