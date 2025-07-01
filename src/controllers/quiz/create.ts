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
import { createQuizSchema } from '../../schemas/quizSchema'
import { QuizModel } from '../../models/quizModel'
import { QuizQuestionModel } from '../../models/quizQuestion'
import { QuizOptionModel } from '../../models/quizOption'

export const createQuizWithTransaction = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { error: validationError, value: validatedData } = validateRequest(
    createQuizSchema,
    req.body
  ) as {
    error: ValidationError
    value: {
      title: string
      description?: string
      items: Array<{
        questionText: string
        options: Array<{ optionText: string; isCorrect: boolean }>
      }>
    }
  }

  if (validationError) return handleValidationError(res, validationError)

  const t = await QuizModel.sequelize!.transaction()

  try {
    const newQuiz = await QuizModel.create(
      {
        title: validatedData.title,
        description: validatedData.description
      },
      { transaction: t }
    )

    for (const item of validatedData.items) {
      const newQuestion = await QuizQuestionModel.create(
        {
          questionText: item.questionText,
          quizId: newQuiz.dataValues.id!
        },
        { transaction: t }
      )

      const optionsToCreate = item.options.map((opt) => ({
        ...opt,
        questionId: newQuestion.id!
      }))

      await QuizOptionModel.bulkCreate(optionsToCreate, { transaction: t })
    }

    await t.commit()

    logger.info(
      `Quiz with ID ${newQuiz.id} created successfully with questions and options.`
    )

    return res.status(StatusCodes.CREATED).json(
      ResponseData.success({
        message: 'Quiz created successfully',
        data: {
          quizId: newQuiz.id,
          totalQuestions: validatedData.items.length
        }
      })
    )
  } catch (error) {
    await t.rollback()
    return handleServerError(res, error)
  }
}
