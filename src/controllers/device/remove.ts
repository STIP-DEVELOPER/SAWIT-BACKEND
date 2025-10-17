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
import { removeDeviceSchema } from '../../schemas/deviceSchema'
import { IDeviceRemoveRequest } from '../../interfaces/device/device.request'
import { DeviceModel } from '../../models/deviceModel'

export const removeDevice = async (req: Request, res: Response): Promise<Response> => {
  const { error: validationError, value: queryParams } = validateRequest(
    removeDeviceSchema,
    req.params
  ) as {
    error: ValidationError
    value: IDeviceRemoveRequest
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

    await result.destroy()

    const response = ResponseData.success({
      message: 'Device result deleted successfully'
    })
    logger.info('Device result deleted successfully')
    return res.status(StatusCodes.OK).json(response)
  } catch (serverError) {
    return handleServerError(res, serverError)
  }
}
