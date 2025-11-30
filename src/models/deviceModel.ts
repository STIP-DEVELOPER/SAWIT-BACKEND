import { DataTypes } from 'sequelize'
import { sequelize } from '../database/config'
import { BaseModelFields } from '../database/baseModelFields'
import { DeviceInstance } from '../interfaces/device/device.dto'
import { LocationModel } from './locationModel'

export const DeviceModel = sequelize.define<DeviceInstance>(
  'Device',
  {
    ...BaseModelFields,
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive', 'maintenance'),
      allowNull: false,
      defaultValue: 'active'
    },
    fertilizerVolume: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    fertilizeType: {
      type: DataTypes.ENUM(
        'NPK',
        'UREA',
        'DOLOMIT',
        'MOP',
        'KIESERITE',
        'ROCK PHOSPHATE'
      ),
      allowNull: false,
      defaultValue: 'NPK'
    },
    speed: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    token: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      defaultValue: ''
    }
  },
  {
    tableName: 'device',
    timestamps: true,
    underscored: true
  }
)

DeviceModel.hasMany(LocationModel, {
  foreignKey: 'deviceId',
  as: 'locations',
  onDelete: 'CASCADE'
})

LocationModel.belongsTo(DeviceModel, {
  foreignKey: 'deviceId',
  as: 'device',
  onDelete: 'CASCADE'
})
