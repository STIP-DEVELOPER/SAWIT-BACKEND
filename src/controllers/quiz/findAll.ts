import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ValidationError } from 'joi'
import { Op, Sequelize } from 'sequelize'
import { IQuizFindAllRequest } from '../../interfaces/quiz/quiz.request'
import logger from '../../logs'
import { QuizModel } from '../../models/quizModel'
import { Pagination } from '../../utilities/pagination'
import {
  validateRequest,
  handleValidationError,
  handleServerError
} from '../../utilities/requestHandler'
import { ResponseData } from '../../utilities/response'
import { findAllQuizSchema } from '../../schemas/quizSchema'

export const findAllQuiz = async (req: Request, res: Response): Promise<Response> => {
  const { error: validationError, value: queryParams } = validateRequest(
    findAllQuizSchema,
    req.query
  ) as {
    error: ValidationError
    value: IQuizFindAllRequest
  }

  if (validationError) return handleValidationError(res, validationError)

  try {
    const {
      page: queryPage,
      size: querySize,
      search,
      pagination,
      startDate,
      endDate,
      category
    } = queryParams

    const page = new Pagination(Number(queryPage) || 0, Number(querySize) || 10)

    const dateFilter =
      startDate && endDate
        ? {
            createdAt: {
              [Op.between]: [new Date(startDate), new Date(endDate)]
            }
          }
        : {}

    const totalQuestionsSubQuery = Sequelize.literal(`(
      SELECT COUNT(*) FROM quiz_question AS questions WHERE questions.quiz_id = Quiz.id
    )`)

    const result = await QuizModel.findAndCountAll({
      where: {
        deleted: false,
        ...(search && {
          title: { [Op.like]: `%${search}%` }
        }),
        ...(category && {
          category
        }),
        ...dateFilter
      },
      attributes: {
        include: [[totalQuestionsSubQuery, 'totalQuestions']]
      },
      order: [['id', 'desc']],
      ...(pagination === true && {
        limit: page.limit,
        offset: page.offset
      })
    })

    const response = ResponseData.success({ data: result })
    logger.info('Quiz retrieved successfully')

    response.data = page.formatData(result)

    return res.status(StatusCodes.OK).json(response)
  } catch (serverError) {
    return handleServerError(res, serverError)
  }
}
