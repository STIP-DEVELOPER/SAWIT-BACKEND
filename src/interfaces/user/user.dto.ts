import { Model } from 'sequelize'
import { IBaseModelFields } from '../../database/baseModelFields'

export interface IUserAttributes extends IBaseModelFields {
  name: string
  email: string
  password: string
  role: 'superAdmin' | 'admin'
}

export type IUserCreationAttributes = Omit<
  IUserAttributes,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>

export interface UserInstance
  extends Model<IUserAttributes, IUserCreationAttributes>,
    IUserAttributes {}
