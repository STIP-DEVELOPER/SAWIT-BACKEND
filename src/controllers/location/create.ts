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
import { createLocationSchema } from '../../schemas/locationSchema'
import { LocationModel } from '../../models/locationModel'
import { ILocationAttributes } from '../../interfaces/location/location.dto'

export const createLocation = async (req: Request, res: Response): Promise<Response> => {
  const { error: validationError, value: validatedData } = validateRequest(
    createLocationSchema,
    req.body
  ) as {
    error: ValidationError
    value: ILocationAttributes
  }

  if (validationError) return handleValidationError(res, validationError)

  try {
    await LocationModel.create(validatedData)
    logger.info(`Create Location request result successfully`)

    return res.status(StatusCodes.CREATED).json(ResponseData.success({}))
  } catch (error) {
    return handleServerError(res, error)
  }
}
