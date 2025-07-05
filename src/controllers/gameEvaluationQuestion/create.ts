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
import { createGameEvaluationQuestionSchema } from '../../schemas/gameEvaluationQuestionSchema'
import { IGameEvaluationQuestionCreateRequest } from '../../interfaces/gameEvaluationQuestion/gameEvaluationQuestion.request'
import { GameEvaluationQuestionModel } from '../../models/gameEvaluationQuestionModel'

export const createGameEvaluationQuestion = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { error: validationError, value: validatedData } = validateRequest(
    createGameEvaluationQuestionSchema,
    req.body
  ) as {
    error: ValidationError
    value: IGameEvaluationQuestionCreateRequest
  }

  if (validationError) return handleValidationError(res, validationError)

  try {
    await GameEvaluationQuestionModel.create(validatedData)

    logger.info(`Create game evaluation question request result successfully`)

    return res.status(StatusCodes.CREATED).json(ResponseData.success({}))
  } catch (error) {
    return handleServerError(res, error)
  }
}
