import { type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ValidationError } from 'joi'
import { IUserFindDetailRequest } from '../../interfaces/user.dto'
import logger from '../../logs'
import { UserModel } from '../../models/user'
import { findDetailUserSchema } from '../../schemas/user'
import {
  validateRequest,
  handleValidationError,
  handleServerError
} from '../../utilities/requestHandler'
import { ResponseData } from '../../utilities/response'

export const findDetailUser = async (req: any, res: Response): Promise<Response> => {
  const { error: validationError, value: queryParams } = validateRequest(
    findDetailUserSchema,
    req.params
  ) as {
    error: ValidationError
    value: IUserFindDetailRequest
  }

  if (validationError) return handleValidationError(res, validationError)

  try {
    const result = await UserModel.findOne({
      where: {
        deleted: false,
        id: queryParams.id
      },
      attributes: [
        'id',
        'whatsappNumber',
        'name',
        'email',
        'role',
        'createdAt',
        'updatedAt'
      ]
    })

    if (result == null) {
      const message = 'User not found!'
      logger.info(message)
      return res.status(StatusCodes.NOT_FOUND).json(ResponseData.error({ message }))
    }

    const response = ResponseData.success({ data: result })
    logger.info(`Fetched user with ID: ${queryParams.id} successfully`)
    return res.status(StatusCodes.OK).json(response)
  } catch (serverError) {
    return handleServerError(res, serverError)
  }
}
