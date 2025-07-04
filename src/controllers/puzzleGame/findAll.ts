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
import { findAllPuzzleGameSchema } from '../../schemas/puzzleGameSchema'
import { IPuzzleGameFindAllRequest } from '../../interfaces/puzzleGame/puzzleGame.request'
import { PuzzleGameModel } from '../../models/puzzleGameModel'

export const findAllPuzzleGame = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { error: validationError, value: queryParams } = validateRequest(
    findAllPuzzleGameSchema,
    req.query
  ) as {
    error: ValidationError
    value: IPuzzleGameFindAllRequest
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

    const result = await PuzzleGameModel.findAndCountAll({
      where: {
        deleted: false,
        ...(search && {
          title: { [Op.like]: `%${search}%` }
        }),

        ...dateFilter
      },
      order: [['id', 'desc']],
      ...(pagination === true && {
        limit: page.limit,
        offset: page.offset
      })
    })

    const response = ResponseData.success({ data: result })
    logger.info('Puzzle game retrieved successfully')

    response.data = page.formatData(result)

    return res.status(StatusCodes.OK).json(response)
  } catch (serverError) {
    return handleServerError(res, serverError)
  }
}
