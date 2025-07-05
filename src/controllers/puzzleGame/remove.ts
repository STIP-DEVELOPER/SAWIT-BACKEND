import { type Response, type Request } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ValidationError } from 'joi'
import logger from '../../logs'
import {
  validateRequest,
  handleValidationError,
  handleServerError
} from '../../utilities/requestHandler'
import { ResponseData } from '../../utilities/response'
import { deletePuzzleGameSchema } from '../../schemas/puzzleGameSchema'
import { IPuzzleGameRemoveRequest } from '../../interfaces/puzzleGame/puzzleGame.request'
import { PuzzleGameModel } from '../../models/puzzleGameModel'

export const removePuzzleGame = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { error: validationError, value: queryParams } = validateRequest(
    deletePuzzleGameSchema,
    req.params
  ) as {
    error: ValidationError
    value: IPuzzleGameRemoveRequest
  }

  if (validationError) return handleValidationError(res, validationError)

  try {
    const result = await PuzzleGameModel.findOne({
      where: {
        deleted: false,
        id: queryParams.id
      }
    })

    if (result == null) {
      const message = `Puzzle gmae result not found with ID: ${queryParams.id}`
      logger.warn(message)
      return res.status(StatusCodes.NOT_FOUND).json(ResponseData.error({ message }))
    }

    await result.destroy()

    const response = ResponseData.success({
      message: 'Puzzle game result deleted successfully'
    })
    logger.info('Puzzle game result deleted successfully')
    return res.status(StatusCodes.OK).json(response)
  } catch (serverError) {
    return handleServerError(res, serverError)
  }
}
