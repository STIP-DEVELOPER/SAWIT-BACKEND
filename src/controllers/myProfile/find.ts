import { type Response, type Request } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ValidationError } from 'joi'
import logger from '../../logs'
import {
  validateRequest,
  handleValidationError,
  handleServerError
} from '../../utilities/requestHandler'
import { ResponseData } from '../../utilities/response'
import { findDetailMyProfileSchema } from '../../schemas/myProfileSchema'
import { UserModel } from '../../models/user'
import { IMyProfile } from '../../interfaces/user/user.request'

export const findMyProfile = async (req: Request, res: Response): Promise<Response> => {
  const { error: validationError, value: validateData } = validateRequest(
    findDetailMyProfileSchema,
    req.body
  ) as {
    error: ValidationError
    value: IMyProfile
  }

  if (validationError) return handleValidationError(res, validationError)

  try {
    const result = await UserModel.findOne({
      where: {
        deleted: false,
        id: validateData?.jwtPayload?.userId
      },
      attributes: ['id', 'name', 'role', 'email', 'createdAt']
    })

    if (result == null) {
      const message = `User not found`
      logger.warn(message)
      return res.status(StatusCodes.NOT_FOUND).json(ResponseData.error({ message }))
    }

    const response = ResponseData.success({ data: result })
    logger.info('User found successfully')
    return res.status(StatusCodes.OK).json(response)
  } catch (serverError) {
    return handleServerError(res, serverError)
  }
}
