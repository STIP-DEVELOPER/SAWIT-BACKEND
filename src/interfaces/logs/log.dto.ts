import { Model } from 'sequelize'
import { IBaseModelFields } from '../../database/baseModelFields'

export interface ILogAttributes extends IBaseModelFields {
  deviceId: number
  deviceName: string
  message: string
  level: 'info' | 'warning' | 'error'
}

export type ILogCreationAttributes = Omit<
  ILogAttributes,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>

export interface LogInstance
  extends Model<ILogAttributes, ILogCreationAttributes>,
    ILogAttributes {}
