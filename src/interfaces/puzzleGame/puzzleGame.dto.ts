import { Model } from 'sequelize'
import { IBaseModelFields } from '../../database/baseModelFields'

export interface IPuzzleGameAttributes extends IBaseModelFields {
  title: string
  description: string
  image: string
}

export type IPuzzleGameCreationAttributes = Omit<
  IPuzzleGameAttributes,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>

export interface PuzzleGameInstance
  extends Model<IPuzzleGameAttributes, IPuzzleGameCreationAttributes>,
    IPuzzleGameAttributes {}
