import { Model } from 'sequelize'
import { IBaseModelFields } from '../../database/baseModelFields'

export interface IQuizResultAttributes extends IBaseModelFields {
  userId: number
  quizId: number
  score: number
}

export type IQuizResultCreationAttributes = Omit<
  IQuizResultAttributes,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>

export interface QuizResultInstance
  extends Model<IQuizResultAttributes, IQuizResultCreationAttributes>,
    IQuizResultAttributes {}
