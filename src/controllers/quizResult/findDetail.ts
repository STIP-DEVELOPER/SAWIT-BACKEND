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
import { findDetailQuizResultSchema } from '../../schemas/quizResultSchema'
import { IQuizResultFindDetailRequest } from '../../interfaces/quizResult/quizResult.request'
import { QuizResultModel } from '../../models/quizResult'

export const findDetailQuizResult = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { error: validationError, value: queryParams } = validateRequest(
    findDetailQuizResultSchema,
    req.params
  ) as {
    error: ValidationError
    value: IQuizResultFindDetailRequest
  }

  if (validationError) return handleValidationError(res, validationError)

  try {
    const result = await QuizResultModel.findOne({
      where: {
        deleted: false,
        id: queryParams.id
      }
    })

    if (result == null) {
      const message = `Quiz result not found with ID: ${queryParams.id}`
      logger.warn(message)
      return res.status(StatusCodes.NOT_FOUND).json(ResponseData.error({ message }))
    }

    const response = ResponseData.success({ data: result })
    logger.info('Quiz result found successfully')
    return res.status(StatusCodes.OK).json(response)
  } catch (serverError) {
    return handleServerError(res, serverError)
  }
}
