import { type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { Op } from 'sequelize'
import { IUserFindAllRequest } from '../../interfaces/user/user.request'
import logger from '../../logs'
import { UserModel } from '../../models/user'
import { findAllUsersSchema } from '../../schemas/user'
import { Pagination } from '../../utilities/pagination'
import {
  validateRequest,
  handleValidationError,
  handleServerError
} from '../../utilities/requestHandler'
import { ResponseData } from '../../utilities/response'
import { ValidationError } from 'joi'

export const findAllUser = async (req: any, res: Response): Promise<Response> => {
  const { error: validationError, value: queryParams } = validateRequest(
    findAllUsersSchema,
    req.query
  ) as {
    error: ValidationError
    value: IUserFindAllRequest
  }

  if (validationError) return handleValidationError(res, validationError)

  const { page: queryPage, size: querySize, search, pagination } = queryParams

  try {
    const page = new Pagination(Number(queryPage) || 0, Number(querySize) || 10)

    const result = await UserModel.findAndCountAll({
      where: {
        deleted: false,
        // userId: { [Op.not]: req.body?.jwtPayload?.userId },
        ...(Boolean(search) && {
          [Op.or]: [{ name: { [Op.like]: `%${search}%` } }]
        })
      },
      attributes: ['id', 'name', 'email', 'role', 'createdAt', 'updatedAt'],
      order: [['id', 'desc']],
      ...(pagination === true && {
        limit: page.limit,
        offset: page.offset
      })
    })

    const response = ResponseData.success({ data: result })
    response.data = page.formatData(result)
    logger.info('Fetched all users successfully')
    return res.status(StatusCodes.OK).json(response)
  } catch (serverError) {
    return handleServerError(res, serverError)
  }
}
