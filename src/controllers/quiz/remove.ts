import { type Response, type Request } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ValidationError } from 'joi'
import { IQuizRemoveRequest } from '../../interfaces/quiz/quiz.request'
import logger from '../../logs'
import { QuizModel } from '../../models/quizModel'
import {
  validateRequest,
  handleValidationError,
  handleServerError
} from '../../utilities/requestHandler'
import { ResponseData } from '../../utilities/response'
import { deleteQuizSchema } from '../../schemas/quizSchema'

export const removeQuiz = async (req: Request, res: Response): Promise<Response> => {
  const { error: validationError, value: queryParams } = validateRequest(
    deleteQuizSchema,
    req.params
  ) as {
    error: ValidationError
    value: IQuizRemoveRequest
  }

  if (validationError) return handleValidationError(res, validationError)

  try {
    const result = await QuizModel.findOne({
      where: {
        deleted: false,
        id: queryParams.id
      }
    })

    if (result == null) {
      const message = `Quiz not found with ID: ${queryParams.id}`
      logger.warn(message)
      return res.status(StatusCodes.NOT_FOUND).json(ResponseData.error({ message }))
    }

    result.deleted = true
    await result.save()

    const response = ResponseData.success({ message: 'Quiz deleted successfully' })
    logger.info('Quiz deleted successfully')
    return res.status(StatusCodes.OK).json(response)
  } catch (serverError) {
    return handleServerError(res, serverError)
  }
}
