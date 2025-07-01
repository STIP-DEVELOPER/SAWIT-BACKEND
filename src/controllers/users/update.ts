import { type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ValidationError } from 'joi'
import { IUserUpdateRequest } from '../../interfaces/user.dto'
import logger from '../../logs'
import { UserModel } from '../../models/user'
import { updateUserSchema } from '../../schemas/user'
import {
  validateRequest,
  handleValidationError,
  handleServerError
} from '../../utilities/requestHandler'
import { ResponseData } from '../../utilities/response'
import { hashPassword } from '../../utilities/scurePassword'

export const updateUser = async (req: any, res: Response): Promise<Response> => {
  const { error: validationError, value: validatedData } = validateRequest(
    updateUserSchema,
    req.body
  ) as {
    error: ValidationError
    value: IUserUpdateRequest
  }

  if (validationError) return handleValidationError(res, validationError)

  try {
    const user = await UserModel.findOne({
      where: {
        deleted: false,
        id: validatedData.id
      }
    })

    if (user == null) {
      const message = 'User not found!'
      logger.info(`Attempt to update non-existing user: ${validatedData.id}`)
      return res.status(StatusCodes.NOT_FOUND).json(ResponseData.error({ message }))
    }

    const { name, email, whatsappNumber, password, role } = validatedData

    const updatedData: Partial<IUserUpdateRequest | unknown> = {
      ...(name?.length ? { name } : {}),
      ...(email?.length ? { email } : {}),
      ...(whatsappNumber?.length ? { whatsappNumber } : {}),
      ...(password?.length ? { password: hashPassword(password) } : {}),
      ...(role?.length ? { role } : {})
    }

    await UserModel.update(updatedData, {
      where: {
        deleted: false,
        id: validatedData.id
      }
    })

    logger.info(`User ${validatedData.id} updated successfully`)

    const response = ResponseData.success({ message: 'User updated successfully' })
    return res.status(StatusCodes.OK).json(response)
  } catch (serverError) {
    return handleServerError(res, serverError)
  }
}
