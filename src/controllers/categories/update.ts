import { type Response, type Request } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ValidationError } from 'joi'
import { ICategoryUpdateRequest } from '../../interfaces/category.dto'
import logger from '../../logs'
import { CategoryModel } from '../../models/categoryModel'
import { updateCategorySchema } from '../../schemas/categorySchema'
import {
  validateRequest,
  handleValidationError,
  handleServerError
} from '../../utilities/requestHandler'
import { ResponseData } from '../../utilities/response'

export const updateCategory = async (req: Request, res: Response): Promise<Response> => {
  const { error: validationError, value: validatedData } = validateRequest(
    updateCategorySchema,
    req.body
  ) as {
    error: ValidationError
    value: ICategoryUpdateRequest
  }

  if (validationError) return handleValidationError(res, validationError)

  try {
    const [updated] = await CategoryModel.update(validatedData, {
      where: { deleted: false, id: validatedData.id }
    })

    if (updated === 0) {
      const message = `Category not found with ID: ${validatedData.id}`
      logger.warn(message)
      return res.status(StatusCodes.NOT_FOUND).json(ResponseData.error({ message }))
    }

    const response = ResponseData.success({})

    logger.info('Category updated successfully')
    return res.status(StatusCodes.OK).json(response)
  } catch (serverError) {
    return handleServerError(res, serverError)
  }
}
