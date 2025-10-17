import { DataTypes } from 'sequelize'
import { BaseModelFields } from '../database/baseModelFields'
import { sequelize } from '../database/config'
import { UserInstance } from '../interfaces/user/user.dto'

export const UserModel = sequelize.define<UserInstance>(
  'User',
  {
    ...BaseModelFields,
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM('superAdmin', 'admin'),
      allowNull: false,
      defaultValue: 'admin'
    }
  },
  {
    tableName: 'user',
    timestamps: true,
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    engine: 'InnoDB'
  }
)
