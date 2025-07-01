import { Model } from 'sequelize'
import { IBaseModelFields } from '../../database/baseModelFields'

export interface IQuizQuestionAttributes extends IBaseModelFields {
  questionText: string
  quizId: number
}

export type IQuizQuestionCreationAttributes = Omit<
  IQuizQuestionAttributes,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>

export interface QuizQuestionInstance
  extends Model<IQuizQuestionAttributes, IQuizQuestionCreationAttributes>,
    IQuizQuestionAttributes {}
