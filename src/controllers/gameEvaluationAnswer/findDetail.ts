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
import { findDetailGameEvaluationAnswerSchema } from '../../schemas/gameEvaluationAnswerSchema'
import { IGameEvaluationAnswerFindDetailRequest } from '../../interfaces/gameEvaluationAnswer/gameEvaluationAnswer.request'
import { GameEvaluationAnswerModel } from '../../models/gameEvaluationAnswerModel'

export const findDetailGameEvaluationAnswer = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { error: validationError, value: queryParams } = validateRequest(
    findDetailGameEvaluationAnswerSchema,
    req.params
  ) as {
    error: ValidationError
    value: IGameEvaluationAnswerFindDetailRequest
  }

  if (validationError) return handleValidationError(res, validationError)

  try {
    const result = await GameEvaluationAnswerModel.findOne({
      where: {
        deleted: false,
        id: queryParams.id
      }
    })

    if (result == null) {
      const message = `Game evaluation answer not found with ID: ${queryParams.id}`
      logger.warn(message)
      return res.status(StatusCodes.NOT_FOUND).json(ResponseData.error({ message }))
    }

    const response = ResponseData.success({ data: result })
    logger.info('game evaluation answer found successfully')
    return res.status(StatusCodes.OK).json(response)
  } catch (serverError) {
    return handleServerError(res, serverError)
  }
}
