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
import { updateQuizSchema } from '../../schemas/quizSchema'
import { QuizModel } from '../../models/quizModel'
import { QuizQuestionModel } from '../../models/quizQuestion'
import { QuizOptionModel } from '../../models/quizOption'

export const updateQuiz = async (req: Request, res: Response): Promise<Response> => {
  const { error: validationError, value: validatedData } = validateRequest(
    updateQuizSchema,
    req.body
  ) as {
    error: ValidationError
    value: {
      id: number
      title: string
      description?: string
      items: Array<{
        id: number
        questionText: string
        options: Array<{ id: number; optionText: string; isCorrect: boolean }>
      }>
    }
  }

  if (validationError) return handleValidationError(res, validationError)

  const t = await QuizModel.sequelize!.transaction()

  try {
    const [quizUpdateCount] = await QuizModel.update(
      {
        title: validatedData.title,
        description: validatedData.description
      },
      {
        where: { id: validatedData.id, deleted: false },
        transaction: t
      }
    )

    if (quizUpdateCount === 0) {
      const message = `Quiz not found with ID: ${validatedData.id}`
      logger.warn(message)
      return res.status(StatusCodes.NOT_FOUND).json(ResponseData.error({ message }))
    }

    if (validatedData.items?.length > 0) {
      for (const item of validatedData.items) {
        if (item.id) {
          const [questionUpdateCount] = await QuizQuestionModel.update(
            {
              questionText: item.questionText
            },
            {
              where: { id: item.id },
              transaction: t
            }
          )

          if (questionUpdateCount === 0) {
            throw new Error(`Question not found with ID: ${item.id}`)
          }

          if (item.options?.length > 0) {
            for (const opt of item.options) {
              if (opt.id) {
                const [optionUpdateCount] = await QuizOptionModel.update(
                  {
                    optionText: opt.optionText,
                    isCorrect: opt.isCorrect
                  },
                  {
                    where: { id: opt.id },
                    transaction: t
                  }
                )

                if (optionUpdateCount === 0) {
                  throw new Error(`Option not found with ID: ${opt.id}`)
                }
              } else {
                await QuizOptionModel.create(
                  {
                    ...opt,
                    questionId: item.id
                  },
                  { transaction: t }
                )
              }
            }
          }
        } else {
          const newQuestion = await QuizQuestionModel.create(
            {
              questionText: item.questionText,
              quizId: validatedData.id
            },
            { transaction: t }
          )

          if (item.options?.length > 0) {
            const optionsToCreate = item.options.map((opt) => ({
              ...opt,
              questionId: newQuestion.id!
            }))

            await QuizOptionModel.bulkCreate(optionsToCreate, { transaction: t })
          }
        }
      }
    }

    await t.commit()

    logger.info(`Quiz with ID ${validatedData.id} updated successfully.`)

    return res.status(StatusCodes.OK).json(
      ResponseData.success({
        message: 'Quiz updated successfully',
        data: { quizId: validatedData.id }
      })
    )
  } catch (error) {
    await t.rollback()
    return handleServerError(res, error)
  }
}
