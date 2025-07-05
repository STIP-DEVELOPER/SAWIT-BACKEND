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
import { deleteQuizResultSchema } from '../../schemas/quizResultSchema'
import { IQuizResultRemoveRequest } from '../../interfaces/quizResult/quizResult.request'
import { QuizQuestionModel } from '../../models/quizQuestion'

export const removeQuizResult = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { error: validationError, value: queryParams } = validateRequest(
    deleteQuizResultSchema,
    req.params
  ) as {
    error: ValidationError
    value: IQuizResultRemoveRequest
  }

  if (validationError) return handleValidationError(res, validationError)

  try {
    const result = await QuizQuestionModel.findOne({
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

    await result.destroy()

    const response = ResponseData.success({ message: 'Quiz result deleted successfully' })
    logger.info('Quiz result deleted successfully')
    return res.status(StatusCodes.OK).json(response)
  } catch (serverError) {
    return handleServerError(res, serverError)
  }
}
