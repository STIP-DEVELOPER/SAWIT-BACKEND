import { Model } from 'sequelize'
import { IBaseModelFields } from '../../database/baseModelFields'

export interface IDeviceAttributes extends IBaseModelFields {
  name: string
  status: 'active' | 'inactive' | 'maintenance'
  fertilizerVolume: number
  fertilizeType: 'NPK' | 'UREA' | 'DOLOMIT' | 'MOP' | 'KIESERITE' | 'ROCK PHOSPHATE'
  speed: number
  token: string
}

export type IDeviceCreationAttributes = Omit<
  IDeviceAttributes,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>

export interface DeviceInstance
  extends Model<IDeviceAttributes, IDeviceCreationAttributes>,
    IDeviceAttributes {}
