import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ValidationError } from 'joi'
import { ResponseData } from '../../utilities/response'
import logger from '../../logs'
import {
  handleValidationError,
  validateRequest,
  handleServerError
} from '../../utilities/requestHandler'
import { updateQuizResultSchema } from '../../schemas/quizResultSchema'
import { IQuizResultUpdateRequest } from '../../interfaces/quizResult/quizResult.request'
import { QuizResultModel } from '../../models/quizResult'

export const updateQuizResult = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { error: validationError, value: validatedData } = validateRequest(
    updateQuizResultSchema,
    req.body
  ) as {
    error: ValidationError
    value: IQuizResultUpdateRequest
  }

  if (validationError) return handleValidationError(res, validationError)

  try {
    const [quizResultUpdated] = await QuizResultModel.update(validatedData, {
      where: {
        id: validatedData.id,
        deleted: false
      }
    })

    if (quizResultUpdated === 0) {
      const message = `Quiz result not found with ID: ${validatedData.id}`
      logger.warn(message)
      return res.status(StatusCodes.NOT_FOUND).json(ResponseData.error({ message }))
    }

    logger.info(`Quiz result with ID ${validatedData.id} updated successfully.`)

    return res.status(StatusCodes.OK).json(
      ResponseData.success({
        message: 'Quiz updated successfully'
      })
    )
  } catch (error) {
    return handleServerError(res, error)
  }
}
