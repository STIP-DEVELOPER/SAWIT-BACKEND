import { type Request, type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ValidationError } from 'joi'
import { ResponseData } from '../../utilities/response'
import logger from '../../logs'
import {
  handleValidationError,
  validateRequest,
  handleServerError
} from '../../utilities/requestHandler'
import { createCategorySchema } from '../../schemas/categorySchema'
import { ICategoryAttributes } from '../../interfaces/category.dto'
import { CategoryModel } from '../../models/categoryModel'

export const createCategory = async (req: Request, res: Response): Promise<Response> => {
  const { error: validationError, value: validatedData } = validateRequest(
    createCategorySchema,
    req.body
  ) as {
    error: ValidationError
    value: ICategoryAttributes
  }

  if (validationError) return handleValidationError(res, validationError)

  try {
    const existingStore = await CategoryModel.findOne({
      where: { name: validatedData.name }
    })

    if (existingStore) {
      return res.status(StatusCodes.CONFLICT).json(
        ResponseData.error({
          message: 'Category already in use. Please choose a different name.'
        })
      )
    }

    const result = await CategoryModel.create(validatedData)

    logger.info('Category created successfully')

    const response = ResponseData.success({ data: result })
    return res.status(StatusCodes.CREATED).json(response)
  } catch (serverError) {
    return handleServerError(res, serverError)
  }
}
