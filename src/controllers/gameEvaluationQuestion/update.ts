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
import { updateGameEvaluationQuestionSchema } from '../../schemas/gameEvaluationQuestionSchema'
import { IGameEvaluationQuestionUpdateRequest } from '../../interfaces/gameEvaluationQuestion/gameEvaluationQuestion.request'
import { GameEvaluationQuestionModel } from '../../models/gameEvaluationQuestionModel'

export const updateGameEvaluationQuestion = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { error: validationError, value: validatedData } = validateRequest(
    updateGameEvaluationQuestionSchema,
    req.body
  ) as {
    error: ValidationError
    value: IGameEvaluationQuestionUpdateRequest
  }

  if (validationError) return handleValidationError(res, validationError)

  try {
    const [gameEvaluationQuestionUpdated] = await GameEvaluationQuestionModel.update(
      validatedData,
      {
        where: {
          id: validatedData.id,
          deleted: false
        }
      }
    )

    if (gameEvaluationQuestionUpdated === 0) {
      const message = `Game evaluation question result not found with ID: ${validatedData.id}`
      logger.warn(message)
      return res.status(StatusCodes.NOT_FOUND).json(ResponseData.error({ message }))
    }

    logger.info(
      `Game evaluation question result with ID ${validatedData.id} updated successfully.`
    )

    return res.status(StatusCodes.OK).json(
      ResponseData.success({
        message: 'Game evaluation question updated successfully'
      })
    )
  } catch (error) {
    return handleServerError(res, error)
  }
}
