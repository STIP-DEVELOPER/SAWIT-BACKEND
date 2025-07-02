import { type Response, type Request } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ValidationError } from 'joi'
import { IQuizFindDetailRequest } from '../../interfaces/quiz/quiz.request'
import logger from '../../logs'
import { QuizModel } from '../../models/quizModel'
import {
  validateRequest,
  handleValidationError,
  handleServerError
} from '../../utilities/requestHandler'
import { ResponseData } from '../../utilities/response'
import { findDetailQuizSchema } from '../../schemas/quizSchema'
import { QuizOptionModel } from '../../models/quizOption'
import { QuizQuestionModel } from '../../models/quizQuestion'

export const findDetailQuiz = async (req: Request, res: Response): Promise<Response> => {
  const { error: validationError, value: queryParams } = validateRequest(
    findDetailQuizSchema,
    req.params
  ) as {
    error: ValidationError
    value: IQuizFindDetailRequest
  }

  if (validationError) return handleValidationError(res, validationError)

  try {
    const result = await QuizModel.findOne({
      where: {
        deleted: false,
        id: queryParams.id
      },
      include: [
        {
          model: QuizQuestionModel,
          as: 'questions',
          attributes: ['questionText', 'id', 'quizId'],
          include: [
            {
              model: QuizOptionModel,
              as: 'options',
              attributes: ['optionText', 'id', 'questionId', 'isCorrect']
            }
          ]
        }
      ]
    })

    if (result == null) {
      const message = `Quiz not found with ID: ${queryParams.id}`
      logger.warn(message)
      return res.status(StatusCodes.NOT_FOUND).json(ResponseData.error({ message }))
    }

    const response = ResponseData.success({ data: result })
    logger.info('Quiz found successfully')
    return res.status(StatusCodes.OK).json(response)
  } catch (serverError) {
    return handleServerError(res, serverError)
  }
}
