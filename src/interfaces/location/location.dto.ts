import { Model } from 'sequelize'
import { IBaseModelFields } from '../../database/baseModelFields'

export interface ILocationAttributes extends IBaseModelFields {
  deviceId: number
  latitude: number
  longitude: number
}

export type ILocationCreationAttributes = Omit<
  ILocationAttributes,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>

export interface LocationInstance
  extends Model<ILocationAttributes, ILocationCreationAttributes>,
    ILocationAttributes {}
