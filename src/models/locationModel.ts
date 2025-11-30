import { DataTypes } from 'sequelize'
import { sequelize } from '../database/config'
import { BaseModelFields } from '../database/baseModelFields'
import { LocationInstance } from '../interfaces/location/location.dto'

export const LocationModel = sequelize.define<LocationInstance>(
  'Location',
  {
    ...BaseModelFields,
    deviceId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    latitude: {
      type: DataTypes.STRING,
      allowNull: false
    },
    longitude: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    tableName: 'location',
    timestamps: true,
    underscored: true
  }
)
