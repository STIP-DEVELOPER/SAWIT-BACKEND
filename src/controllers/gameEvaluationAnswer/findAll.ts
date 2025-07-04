import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ValidationError } from 'joi'
import { Op } from 'sequelize'
import logger from '../../logs'
import { Pagination } from '../../utilities/pagination'
import {
  validateRequest,
  handleValidationError,
  handleServerError
} from '../../utilities/requestHandler'
import { ResponseData } from '../../utilities/response'
import { findAllGameEvaluationAnswerSchema } from '../../schemas/gameEvaluationAnswerSchema'
import { IGameEvaluationAnswerFindAllRequest } from '../../interfaces/gameEvaluationAnswer/gameEvaluationAnswer.request'
import { GameEvaluationAnswerModel } from '../../models/gameEvaluationAnswerModel'
import { GameEvaluationQuestionModel } from '../../models/gameEvaluationQuestionModel'

export const findAllGameEvaluationAnswer = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { error: validationError, value: queryParams } = validateRequest(
    findAllGameEvaluationAnswerSchema,
    req.query
  ) as {
    error: ValidationError
    value: IGameEvaluationAnswerFindAllRequest
  }

  if (validationError) return handleValidationError(res, validationError)

  try {
    const {
      page: queryPage,
      size: querySize,
      search,
      pagination,
      startDate,
      endDate
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

    const result = await GameEvaluationAnswerModel.findAndCountAll({
      where: {
        deleted: false,
        ...(search && {
          answer: { [Op.like]: `%${search}%` }
        }),

        ...dateFilter
      },
      include: [
        {
          model: GameEvaluationQuestionModel,
          as: 'question',
          attributes: ['question']
        }
      ],
      order: [['id', 'desc']],
      ...(pagination === true && {
        limit: page.limit,
        offset: page.offset
      })
    })

    const response = ResponseData.success({ data: result })
    logger.info('Game evaluation answer  retrieved successfully')

    response.data = page.formatData(result)

    return res.status(StatusCodes.OK).json(response)
  } catch (serverError) {
    return handleServerError(res, serverError)
  }
}
