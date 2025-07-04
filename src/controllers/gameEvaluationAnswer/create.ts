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
import { createGameEvaluationAnswerSchema } from '../../schemas/gameEvaluationAnswerSchema'
import { GameEvaluationAnswerModel } from '../../models/gameEvaluationAnswerModel'
import { IGameEvaluationAnswerCreateRequest } from '../../interfaces/gameEvaluationAnswer/gameEvaluationAnswer.request'

export const createGameEvaluationAnswer = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { error: validationError, value: validatedData } = validateRequest(
    createGameEvaluationAnswerSchema,
    req.body
  ) as {
    error: ValidationError
    value: IGameEvaluationAnswerCreateRequest
  }

  if (validationError) return handleValidationError(res, validationError)

  try {
    await GameEvaluationAnswerModel.create(validatedData)

    logger.info(`Create game evaluation answer request result successfully`)

    return res.status(StatusCodes.CREATED).json(ResponseData.success({}))
  } catch (error) {
    return handleServerError(res, error)
  }
}
