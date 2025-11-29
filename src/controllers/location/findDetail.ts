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
import { IDeviceFindDetailRequest } from '../../interfaces/device/device.request'
import { DeviceModel } from '../../models/deviceModel'
import { findDetailLocationSchema } from '../../schemas/locationSchema'

export const findDetailLocation = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { error: validationError, value: queryParams } = validateRequest(
    findDetailLocationSchema,
    req.params
  ) as {
    error: ValidationError
    value: IDeviceFindDetailRequest
  }

  if (validationError) return handleValidationError(res, validationError)

  try {
    const result = await DeviceModel.findOne({
      where: {
        deleted: false,
        id: queryParams.id
      }
    })

    if (result == null) {
      const message = `Location result not found with ID: ${queryParams.id}`
      logger.warn(message)
      return res.status(StatusCodes.NOT_FOUND).json(ResponseData.error({ message }))
    }

    const response = ResponseData.success({ data: result })
    return res.status(StatusCodes.OK).json(response)
  } catch (serverError) {
    return handleServerError(res, serverError)
  }
}
