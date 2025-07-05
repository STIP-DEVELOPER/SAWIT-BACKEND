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

import { GameEvaluationAnswerModel } from '../../models/gameEvaluationAnswerModel'
import { IGameEvaluationAnswerCreateRequest } from '../../interfaces/gameEvaluationAnswer/gameEvaluationAnswer.request'
import { createManyGameEvaluationAnswerSchema } from '../../schemas/gameEvaluationAnswerSchema'

export const createGameEvaluationAnswer = async (
  req: Request,
  res: Response
): Promise<Response> => {
  console.log(req.body)
  const { error: validationError, value: validatedData } = validateRequest(
    createManyGameEvaluationAnswerSchema,
    req.body
  ) as {
    error: ValidationError
    value: { jwtPayload: any; answers: IGameEvaluationAnswerCreateRequest[] }
  }

  if (validationError) return handleValidationError(res, validationError)

  try {
    const payload = validatedData?.answers.map((item) => {
      return {
        ...item,
        userId: req.body.jwtPayload.userId
      }
    })

    await GameEvaluationAnswerModel.bulkCreate(payload)

    logger.info(`Create game evaluation answer request result successfully`)

    return res.status(StatusCodes.CREATED).json(ResponseData.success({}))
  } catch (error) {
    return handleServerError(res, error)
  }
}
