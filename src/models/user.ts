import { DataTypes, Model } from 'sequelize'
import { UserAttributes, UserCreationAttributes } from '../interfaces/user.dto'
import { BaseModelFields } from '../database/baseModelFields'
import { sequelize } from '../database/config'

export interface UserInstance
  extends Model<UserAttributes, UserCreationAttributes>,
    UserAttributes {}

export const UserModel = sequelize.define<UserInstance>(
  'User',
  {
    ...BaseModelFields,
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    whatsappNumber: {
      type: DataTypes.STRING,
      allowNull: true
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
      type: DataTypes.ENUM('superAdmin', 'admin', 'user'),
      allowNull: false,
      defaultValue: 'user'
    }
  },
  {
    tableName: 'users',
    timestamps: true,
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    engine: 'InnoDB'
  }
)
