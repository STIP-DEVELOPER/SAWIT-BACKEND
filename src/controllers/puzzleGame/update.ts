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
import { updatePuzzleGameSchema } from '../../schemas/puzzleGameSchema'
import { IPuzzleGameUpdateRequest } from '../../interfaces/puzzleGame/puzzleGame.request'
import { PuzzleGameModel } from '../../models/puzzleGameModel'

export const updatePuzzleGame = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { error: validationError, value: validatedData } = validateRequest(
    updatePuzzleGameSchema,
    req.body
  ) as {
    error: ValidationError
    value: IPuzzleGameUpdateRequest
  }

  if (validationError) return handleValidationError(res, validationError)

  try {
    const [quizResultUpdated] = await PuzzleGameModel.update(validatedData, {
      where: {
        id: validatedData.id,
        deleted: false
      }
    })

    if (quizResultUpdated === 0) {
      const message = `Puzzle game result not found with ID: ${validatedData.id}`
      logger.warn(message)
      return res.status(StatusCodes.NOT_FOUND).json(ResponseData.error({ message }))
    }

    logger.info(`Puzzle game result with ID ${validatedData.id} updated successfully.`)

    return res.status(StatusCodes.OK).json(
      ResponseData.success({
        message: 'Puzzle game updated successfully'
      })
    )
  } catch (error) {
    return handleServerError(res, error)
  }
}
