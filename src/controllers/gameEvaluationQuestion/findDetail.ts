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
import { findDetailGameEvaluationQuestionSchema } from '../../schemas/gameEvaluationQuestionSchema'
import { IGameEvaluationQuestionFindDetailRequest } from '../../interfaces/gameEvaluationQuestion/gameEvaluationQuestion.request'
import { GameEvaluationQuestionModel } from '../../models/gameEvaluationQuestionModel'

export const findDetailGameEvaluationQuestion = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { error: validationError, value: queryParams } = validateRequest(
    findDetailGameEvaluationQuestionSchema,
    req.params
  ) as {
    error: ValidationError
    value: IGameEvaluationQuestionFindDetailRequest
  }

  if (validationError) return handleValidationError(res, validationError)

  try {
    const result = await GameEvaluationQuestionModel.findOne({
      where: {
        deleted: false,
        id: queryParams.id
      }
    })

    if (result == null) {
      const message = `Game evaluation result not found with ID: ${queryParams.id}`
      logger.warn(message)
      return res.status(StatusCodes.NOT_FOUND).json(ResponseData.error({ message }))
    }

    const response = ResponseData.success({ data: result })
    logger.info('game evaluation result found successfully')
    return res.status(StatusCodes.OK).json(response)
  } catch (serverError) {
    return handleServerError(res, serverError)
  }
}
