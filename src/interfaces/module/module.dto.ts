import { Model } from 'sequelize'
import { IBaseModelFields } from '../../database/baseModelFields'

export interface IModuleAttributes extends IBaseModelFields {
  title: string
  description: string
  image?: string
}

export type IModuleCreationAttributes = Omit<
  IModuleAttributes,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>

export interface ModuleInstance
  extends Model<IModuleAttributes, IModuleCreationAttributes>,
    IModuleAttributes {}
