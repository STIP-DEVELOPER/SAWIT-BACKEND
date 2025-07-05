import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ValidationError } from 'joi'
import { Op, Sequelize } from 'sequelize'
import logger from '../../logs'
import { Pagination } from '../../utilities/pagination'
import {
  validateRequest,
  handleValidationError,
  handleServerError
} from '../../utilities/requestHandler'
import { ResponseData } from '../../utilities/response'
import { findAllQuizResultSchema } from '../../schemas/quizResultSchema'
import { IQuizResultFindAllRequest } from '../../interfaces/quizResult/quizResult.request'
import { QuizResultModel } from '../../models/quizResult'
import { QuizModel } from '../../models/quizModel'

export const findAllQuizResult = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const requestPayload = {
    ...req.query,
    ...req.body
  }

  const { error: validationError, value: queryParams } = validateRequest(
    findAllQuizResultSchema,
    requestPayload
  ) as {
    error: ValidationError
    value: IQuizResultFindAllRequest
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
      jwtPayload
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

    const result = await QuizResultModel.findAndCountAll({
      where: {
        deleted: false,
        ...(jwtPayload.userRole === 'user' && {
          userId: jwtPayload.userId
        }),
        ...(search && {
          title: { [Op.like]: `%${search}%` }
        }),
        ...dateFilter
      },
      include: [
        {
          model: QuizModel,
          as: 'quiz',
          attributes: [
            [totalQuestionsSubQuery, 'totalQuestions'],
            'id',
            'title',
            'description',
            'category'
          ]
        }
      ],
      attributes: ['id', 'quizId', 'userId', 'score'],
      order: [['id', 'desc']],
      ...(pagination === true && {
        limit: page.limit,
        offset: page.offset
      })
    })

    const response = ResponseData.success({ data: result })
    logger.info('Quiz Result retrieved successfully')

    response.data = page.formatData(result)

    return res.status(StatusCodes.OK).json(response)
  } catch (serverError) {
    return handleServerError(res, serverError)
  }
}
