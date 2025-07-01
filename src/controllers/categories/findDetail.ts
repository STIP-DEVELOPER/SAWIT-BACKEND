import { type Response, type Request } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ValidationError } from 'joi'
import { ICategoryFindDetailRequest } from '../../interfaces/category.dto'
import logger from '../../logs'
import { CategoryModel } from '../../models/categoryModel'
import { findDetailCategorySchema } from '../../schemas/categorySchema'
import {
  validateRequest,
  handleValidationError,
  handleServerError
} from '../../utilities/requestHandler'
import { ResponseData } from '../../utilities/response'

export const findDetailCategory = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { error: validationError, value: queryParams } = validateRequest(
    findDetailCategorySchema,
    req.params
  ) as {
    error: ValidationError
    value: ICategoryFindDetailRequest
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

    const response = ResponseData.success({ data: result })
    logger.info('Category found successfully')
    return res.status(StatusCodes.OK).json(response)
  } catch (serverError) {
    return handleServerError(res, serverError)
  }
}
