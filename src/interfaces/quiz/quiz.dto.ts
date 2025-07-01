import { Model } from 'sequelize'
import { IBaseModelFields } from '../../database/baseModelFields'

export interface IQuizAttributes extends IBaseModelFields {
  title: string
  description?: string
}

export type IQuizCreationAttributes = Omit<
  IQuizAttributes,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>

export interface QuizInstance
  extends Model<IQuizAttributes, IQuizCreationAttributes>,
    IQuizAttributes {}
