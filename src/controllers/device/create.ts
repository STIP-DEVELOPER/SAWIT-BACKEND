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
import { createDeviceSchema } from '../../schemas/deviceSchema'
import { IDeviceCreateRequest } from '../../interfaces/device/device.request'
import { DeviceModel } from '../../models/deviceModel'
import { v4 as uuidv4 } from 'uuid'

export const createDevice = async (req: Request, res: Response): Promise<Response> => {
  const { error: validationError, value: validatedData } = validateRequest(
    createDeviceSchema,
    req.body
  ) as {
    error: ValidationError
    value: IDeviceCreateRequest
  }

  if (validationError) return handleValidationError(res, validationError)

  try {
    validatedData.token = uuidv4()
    await DeviceModel.create(validatedData)

    logger.info(`Create device request result successfully`)

    return res.status(StatusCodes.CREATED).json(ResponseData.success({}))
  } catch (error) {
    return handleServerError(res, error)
  }
}
