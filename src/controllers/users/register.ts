import { type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ValidationError } from 'joi'
import { IUserRegisterRequest } from '../../interfaces/user.dto'
import logger from '../../logs'
import { UserModel } from '../../models/user'
import { userRegistrationSchema } from '../../schemas/user'
import {
  validateRequest,
  handleValidationError,
  handleServerError
} from '../../utilities/requestHandler'
import { ResponseData } from '../../utilities/response'
import { hashPassword } from '../../utilities/scurePassword'

export const registerUser = async (req: any, res: Response): Promise<Response> => {
  const { error: validationError, value: validatedData } = validateRequest(
    userRegistrationSchema,
    req.body
  ) as {
    error: ValidationError
    value: IUserRegisterRequest
  }

  if (validationError) return handleValidationError(res, validationError)

  try {
    const existingUser = await UserModel.findOne({
      raw: true,
      where: {
        deleted: false,
        whatsappNumber: validatedData.whatsappNumber
      }
    })

    if (existingUser != null) {
      const message = `Whatsapp number ${existingUser.whatsappNumber} is already registered. Please use another one.`
      logger.info(`Registration attempt failed: ${message}`)
      return res.status(StatusCodes.BAD_REQUEST).json(ResponseData.error({ message }))
    }

    const hashedPassword = hashPassword(validatedData.password)
    const newUser = {
      ...validatedData,
      password: hashedPassword
    }

    await UserModel.create(newUser)
    logger.info(`User ${validatedData.whatsappNumber} registered successfully`)

    const response = ResponseData.success({ message: 'Registration successful' })
    return res.status(StatusCodes.CREATED).json(response)
  } catch (serverError) {
    return handleServerError(res, serverError)
  }
}
