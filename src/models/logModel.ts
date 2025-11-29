import { DataTypes } from 'sequelize'
import { sequelize } from '../database/config'
import { BaseModelFields } from '../database/baseModelFields'
import { LogInstance } from '../interfaces/logs/log.dto'

export const LogModel = sequelize.define<LogInstance>(
  'Log',
  {
    ...BaseModelFields,
    deviceId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    deviceName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false
    },
    level: {
      type: DataTypes.ENUM('info', 'warning', 'error'),
      allowNull: false,
      defaultValue: 'info'
    }
  },
  {
    tableName: 'log',
    timestamps: true,
    underscored: true
  }
)
