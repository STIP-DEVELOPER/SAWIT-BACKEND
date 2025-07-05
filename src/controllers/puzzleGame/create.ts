import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ValidationError } from 'joi'
import { sequelize } from '../../database/config'
import { ResponseData } from '../../utilities/response'
import logger from '../../logs'
import {
  handleValidationError,
  validateRequest,
  handleServerError
} from '../../utilities/requestHandler'
import { createPuzzleGameSchema } from '../../schemas/puzzleGameSchema'
import { IPuzzleGameCreateRequest } from '../../interfaces/puzzleGame/puzzleGame.request'
import { PuzzleGameModel } from '../../models/puzzleGameModel'
import { GameEvaluationQuestionModel } from '../../models/gameEvaluationQuestionModel'

export const createPuzzleGame = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { error: validationError, value: validatedData } = validateRequest(
    createPuzzleGameSchema,
    req.body
  ) as {
    error: ValidationError
    value: IPuzzleGameCreateRequest
  }

  if (validationError) return handleValidationError(res, validationError)

  const transaction = await sequelize.transaction()

  try {
    const puzzleGame = await PuzzleGameModel.create(validatedData, {
      transaction
    })

    if (validatedData.gameEvaluationQuestion?.length > 0) {
      const questionPayload = validatedData.gameEvaluationQuestion.map((q) => ({
        question: q.question,
        gameId: puzzleGame.id!,
        category: q.category || 'puzzle'
      }))

      await GameEvaluationQuestionModel.bulkCreate(questionPayload, {
        transaction
      })
    }

    await transaction.commit()

    logger.info(`Create puzzle game request successfully`)

    return res.status(StatusCodes.CREATED).json(ResponseData.success({}))
  } catch (error) {
    await transaction.rollback()
    return handleServerError(res, error)
  }
}
