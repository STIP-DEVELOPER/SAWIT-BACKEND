import { Model } from 'sequelize'
import { IBaseModelFields } from '../../database/baseModelFields'

export interface IQuizOptionAttributes extends IBaseModelFields {
  optionText: string
  isCorrect: boolean
  questionId: number
}

export type IQuizOptionCreationAttributes = Omit<
  IQuizOptionAttributes,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>

export interface QuizOptionInstance
  extends Model<IQuizOptionAttributes, IQuizOptionCreationAttributes>,
    IQuizOptionAttributes {}
