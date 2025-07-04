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
import { createPuzzleGameSchema } from '../../schemas/puzzleGameSchema'
import { IPuzzleGameCreateRequest } from '../../interfaces/puzzleGame/puzzleGame.request'
import { PuzzleGameModel } from '../../models/puzzleGameModel'

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

  try {
    await PuzzleGameModel.create(validatedData)

    logger.info(`Create puzzle game request result successfully`)

    return res.status(StatusCodes.CREATED).json(ResponseData.success({}))
  } catch (error) {
    return handleServerError(res, error)
  }
}
