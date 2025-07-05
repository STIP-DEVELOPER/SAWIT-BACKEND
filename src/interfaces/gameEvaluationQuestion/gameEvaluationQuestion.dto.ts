import { Model } from 'sequelize'
import { IBaseModelFields } from '../../database/baseModelFields'

export interface IGameEvaluationQuestionAttributes extends IBaseModelFields {
  question: string
  gameId: number
  category: 'puzzle' | 'word'
}

export type IGameEvaluationQuestionCreationAttributes = Omit<
  IGameEvaluationQuestionAttributes,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>

export interface GameEvaluationQuestionInstance
  extends Model<
      IGameEvaluationQuestionAttributes,
      IGameEvaluationQuestionCreationAttributes
    >,
    IGameEvaluationQuestionAttributes {}
