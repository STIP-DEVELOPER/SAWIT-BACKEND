import { type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ValidationError } from 'joi'
import { IUserRemoveRequest } from '../../interfaces/user/user.request'
import logger from '../../logs'
import { UserModel } from '../../models/user'
import { findDetailUserSchema } from '../../schemas/user'
import {
  validateRequest,
  handleValidationError,
  handleServerError
} from '../../utilities/requestHandler'
import { ResponseData } from '../../utilities/response'

export const removeUser = async (req: any, res: Response): Promise<Response> => {
  const { error: validationError, value: queryParams } = validateRequest(
    findDetailUserSchema,
    req.params
  ) as {
    error: ValidationError
    value: IUserRemoveRequest
  }

  if (validationError) return handleValidationError(res, validationError)

  try {
    const user = await UserModel.findOne({
      where: {
        deleted: false,
        id: queryParams.id
      }
    })

    if (user == null) {
      const message = 'User not found!'
      logger.info(`Attempt to remove non-existing user: ${queryParams.id}`)
      return res.status(StatusCodes.NOT_FOUND).json(ResponseData.error({ message }))
    }

    user.deleted = true
    await user.save()

    logger.info(`User ${queryParams.id} successfully removed`)

    const response = ResponseData.success({ message: 'User successfully removed' })
    return res.status(StatusCodes.OK).json(response)
  } catch (serverError) {
    return handleServerError(res, serverError)
  }
}
