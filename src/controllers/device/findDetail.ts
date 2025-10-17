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
import { findDetailDeviceSchema } from '../../schemas/deviceSchema'
import { IDeviceFindDetailRequest } from '../../interfaces/device/device.request'
import { DeviceModel } from '../../models/deviceModel'

export const findDetailDevice = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { error: validationError, value: queryParams } = validateRequest(
    findDetailDeviceSchema,
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
      const message = `Device result not found with ID: ${queryParams.id}`
      logger.warn(message)
      return res.status(StatusCodes.NOT_FOUND).json(ResponseData.error({ message }))
    }

    const response = ResponseData.success({ data: result })
    logger.info('Device result found successfully')
    return res.status(StatusCodes.OK).json(response)
  } catch (serverError) {
    return handleServerError(res, serverError)
  }
}
