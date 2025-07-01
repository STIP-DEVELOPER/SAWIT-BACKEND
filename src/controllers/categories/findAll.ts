import { type Response, type Request } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ValidationError } from 'joi'
import { Op } from 'sequelize'
import { ICategoryFindAllRequest } from '../../interfaces/category.dto'
import logger from '../../logs'
import { CategoryModel } from '../../models/categoryModel'
import { findAllStoreSchema } from '../../schemas/categorySchema'
import { Pagination } from '../../utilities/pagination'
import {
  validateRequest,
  handleValidationError,
  handleServerError
} from '../../utilities/requestHandler'
import { ResponseData } from '../../utilities/response'

export const findAllCategory = async (req: Request, res: Response): Promise<Response> => {
  const { error: validationError, value: queryParams } = validateRequest(
    findAllStoreSchema,
    req.query
  ) as {
    error: ValidationError
    value: ICategoryFindAllRequest
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

    const result = await CategoryModel.findAndCountAll({
      where: {
        deleted: false,
        ...(search && {
          name: { [Op.like]: `%${search}%` }
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
    response.data = page.formatData(result)

    logger.info('Cagtegory retrieved successfully')
    return res.status(StatusCodes.OK).json(response)
  } catch (serverError) {
    return handleServerError(res, serverError)
  }
}
