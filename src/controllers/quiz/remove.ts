import { type Response, type Request } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ValidationError } from 'joi'
import { ICategoryRemoveRequest } from '../../interfaces/category.dto'
import logger from '../../logs'
import { CategoryModel } from '../../models/categoryModel'
import { deleteCategorySchema } from '../../schemas/categorySchema'
import {
  validateRequest,
  handleValidationError,
  handleServerError
} from '../../utilities/requestHandler'
import { ResponseData } from '../../utilities/response'

export const removeCategory = async (req: Request, res: Response): Promise<Response> => {
  const { error: validationError, value: queryParams } = validateRequest(
    deleteCategorySchema,
    req.params
  ) as {
    error: ValidationError
    value: ICategoryRemoveRequest
  }

  if (validationError) return handleValidationError(res, validationError)

  try {
    const result = await CategoryModel.findOne({
      where: {
        deleted: false,
        id: queryParams.id
      }
    })

    if (result == null) {
      const message = `Category not found with ID: ${queryParams.id}`
      logger.warn(message)
      return res.status(StatusCodes.NOT_FOUND).json(ResponseData.error({ message }))
    }

    result.deleted = true
    await result.save()

    const response = ResponseData.success({ message: 'Category deleted successfully' })
    logger.info('Category deleted successfully')
    return res.status(StatusCodes.OK).json(response)
  } catch (serverError) {
    return handleServerError(res, serverError)
  }
}
