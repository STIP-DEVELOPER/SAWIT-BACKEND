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
import { updateDeviceSchema } from '../../schemas/deviceSchema'
import { IDeviceUpdateRequest } from '../../interfaces/device/device.request'
import { DeviceModel } from '../../models/deviceModel'

export const updateDevice = async (req: Request, res: Response): Promise<Response> => {
  const { error: validationError, value: validatedData } = validateRequest(
    updateDeviceSchema,
    req.body
  ) as {
    error: ValidationError
    value: IDeviceUpdateRequest
  }

  if (validationError) return handleValidationError(res, validationError)

  try {
    const [updated] = await DeviceModel.update(validatedData, {
      where: {
        id: validatedData.id,
        deleted: false
      }
    })

    if (updated === 0) {
      const message = `device result not found with ID: ${validatedData.id}`
      logger.warn(message)
      return res.status(StatusCodes.NOT_FOUND).json(ResponseData.error({ message }))
    }

    logger.info(`device result with ID ${validatedData.id} updated successfully.`)

    return res.status(StatusCodes.OK).json(
      ResponseData.success({
        message: 'device updated successfully'
      })
    )
  } catch (error) {
    return handleServerError(res, error)
  }
}
