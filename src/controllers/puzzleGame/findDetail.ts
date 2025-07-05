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
import { findDetailPuzzleGameSchema } from '../../schemas/puzzleGameSchema'
import { IPuzzleGameFindDetailRequest } from '../../interfaces/puzzleGame/puzzleGame.request'
import { PuzzleGameModel } from '../../models/puzzleGameModel'
import { GameEvaluationQuestionModel } from '../../models/gameEvaluationQuestionModel'

export const findDetailPuzzleGame = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { error: validationError, value: queryParams } = validateRequest(
    findDetailPuzzleGameSchema,
    req.params
  ) as {
    error: ValidationError
    value: IPuzzleGameFindDetailRequest
  }

  if (validationError) return handleValidationError(res, validationError)

  try {
    const result = await PuzzleGameModel.findOne({
      where: {
        deleted: false,
        id: queryParams.id
      },
      include: [
        {
          model: GameEvaluationQuestionModel,
          as: 'evaluations',
          attributes: ['gameId', 'id', 'question', 'category']
        }
      ]
    })

    if (result == null) {
      const message = `Puzzle game result not found with ID: ${queryParams.id}`
      logger.warn(message)
      return res.status(StatusCodes.NOT_FOUND).json(ResponseData.error({ message }))
    }

    const response = ResponseData.success({ data: result })
    logger.info('Puzzle game result found successfully')
    return res.status(StatusCodes.OK).json(response)
  } catch (serverError) {
    return handleServerError(res, serverError)
  }
}
