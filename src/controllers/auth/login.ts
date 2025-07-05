import type { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ValidationError } from 'joi'
import { IUserLoginRequest } from '../../interfaces/user/user.request'
import logger from '../../logs'
import { UserModel } from '../../models/user'
import { userLoginSchema } from '../../schemas/user'
import { generateAccessToken } from '../../utilities/jwt'
import {
  validateRequest,
  handleValidationError,
  handleServerError
} from '../../utilities/requestHandler'
import { ResponseData } from '../../utilities/response'
import { hashPassword } from '../../utilities/scurePassword'

export const loginUser = async (req: Request, res: Response): Promise<Response> => {
  const { error: validationError, value: validatedData } = validateRequest(
    userLoginSchema,
    req.body
  ) as {
    error: ValidationError
    value: IUserLoginRequest
  }

  if (validationError) return handleValidationError(res, validationError)

  try {
    const user = await UserModel.findOne({
      where: { deleted: false, email: validatedData.email }
    })

    if (user == null) {
      const message = 'Account not found. Please register first!'
      logger.info(`Login attempt failed: ${message}`)
      return res.status(StatusCodes.NOT_FOUND).json(ResponseData.error({ message }))
    }

    const isPasswordValid = hashPassword(validatedData.password) === user.password

    if (!isPasswordValid) {
      const message = 'Invalid password combination!'
      logger.info(`Login attempt failed: ${message}`)
      return res.status(StatusCodes.UNAUTHORIZED).json(ResponseData.error({ message }))
    }

    const token = generateAccessToken({ userId: user.id!, userRole: user.role })
    logger.info(`User ${validatedData.email} logged in successfully`)

    const response = ResponseData.success({ data: { token } })
    return res.status(StatusCodes.OK).json(response)
  } catch (serverError) {
    return handleServerError(res, serverError)
  }
}
