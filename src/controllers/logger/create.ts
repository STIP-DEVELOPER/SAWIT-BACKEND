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
import { DeviceModel } from '../../models/deviceModel'
import { ILogCreateRequest } from '../../interfaces/logs/logs.request'
import { LogModel } from '../../models/logModel'
import { createLoggerSchema } from '../../schemas/loggerSchema'

export const createLogger = async (req: Request, res: Response): Promise<Response> => {
  const { error: validationError, value: validatedData } = validateRequest(
    createLoggerSchema,
    req.body
  ) as {
    error: ValidationError
    value: ILogCreateRequest
  }

  if (validationError) return handleValidationError(res, validationError)

  try {
    const device = await DeviceModel.findOne({
      where: { token: validatedData.token }
    })

    if (device == null || device.id == null) {
      const message = `Logger: Device not found`
      logger.warn(message)
      return res.status(StatusCodes.NOT_FOUND).json(ResponseData.error({ message }))
    }

    const payload = {
      deviceId: device.id,
      deviceName: device.name,
      message: validatedData.message,
      level: validatedData.level
    }

    await LogModel.create(payload)

    logger.info(`Create Logger request result successfully`)

    return res.status(StatusCodes.CREATED).json(ResponseData.success({}))
  } catch (error) {
    return handleServerError(res, error)
  }
}
