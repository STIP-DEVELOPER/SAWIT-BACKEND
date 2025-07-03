import { DataTypes } from 'sequelize'
import { sequelize } from '../database/config'
import { BaseModelFields } from '../database/baseModelFields'
import { ModuleInstance } from '../interfaces/module/module.dto'

export const ModuleModel = sequelize.define<ModuleInstance>(
  'Module',
  {
    ...BaseModelFields,
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },
  {
    tableName: 'module',
    timestamps: true,
    underscored: true
  }
)
