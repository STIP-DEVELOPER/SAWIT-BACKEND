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
import { createModuleSchema } from '../../schemas/moduleSchema'
import { IModuleCreateRequest } from '../../interfaces/module/module.request'
import { ModuleModel } from '../../models/moduleModel'

export const createModule = async (req: Request, res: Response): Promise<Response> => {
  const { error: validationError, value: validatedData } = validateRequest(
    createModuleSchema,
    req.body
  ) as {
    error: ValidationError
    value: IModuleCreateRequest
  }

  if (validationError) return handleValidationError(res, validationError)

  try {
    await ModuleModel.create(validatedData)

    logger.info(`Create module request result successfully`)

    return res.status(StatusCodes.CREATED).json(ResponseData.success({}))
  } catch (error) {
    return handleServerError(res, error)
  }
}
