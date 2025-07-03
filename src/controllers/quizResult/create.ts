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
import { IQuizResultCreateRequest } from '../../interfaces/quizResult/quizResult.request'
import { QuizResultModel } from '../../models/quizResult'
import { createQuizResultSchema } from '../../schemas/quizResultSchema'

export const createQuizResult = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { error: validationError, value: validatedData } = validateRequest(
    createQuizResultSchema,
    req.body
  ) as {
    error: ValidationError
    value: IQuizResultCreateRequest
  }

  if (validationError) return handleValidationError(res, validationError)

  try {
    await QuizResultModel.create(validatedData)

    logger.info(`Create request result successfully`)

    return res.status(StatusCodes.CREATED).json(ResponseData.success({}))
  } catch (error) {
    return handleServerError(res, error)
  }
}
