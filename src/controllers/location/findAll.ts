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
import { IDeviceFindAllRequest } from '../../interfaces/device/device.request'
import { DeviceModel } from '../../models/deviceModel'
import { findAllLocationSchema } from '../../schemas/locationSchema'

export const findAllLocation = async (req: Request, res: Response): Promise<Response> => {
  const { error: validationError, value: queryParams } = validateRequest(
    findAllLocationSchema,
    req.query
  ) as {
    error: ValidationError
    value: IDeviceFindAllRequest
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
      status
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

    const result = await DeviceModel.findAndCountAll({
      where: {
        deleted: false,
        ...(search && {
          name: { [Op.like]: `%${search}%` }
        }),
        ...(status && {
          status: status
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
    logger.info('Device Result retrieved successfully')

    response.data = page.formatData(result)

    return res.status(StatusCodes.OK).json(response)
  } catch (serverError) {
    return handleServerError(res, serverError)
  }
}
