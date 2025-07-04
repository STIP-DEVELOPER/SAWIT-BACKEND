import { Model } from 'sequelize'
import { IBaseModelFields } from '../../database/baseModelFields'

export interface IGameEvaluationAnswerAttributes extends IBaseModelFields {
  questionId: number
  gameId: number
  userId: number
  answer: string
  category: 'puzzle' | 'word'
}

export type IGameEvaluationAnswerCreationAttributes = Omit<
  IGameEvaluationAnswerAttributes,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>

export interface GameEvaluationAnswerInstance
  extends Model<IGameEvaluationAnswerAttributes, IGameEvaluationAnswerCreationAttributes>,
    IGameEvaluationAnswerAttributes {}
