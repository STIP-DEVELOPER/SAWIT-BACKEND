import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../database/config'
import { BaseModelFields } from '../database/baseModelFields'
import {
  ICategoryAttributes,
  ICategoryCreationAttributes
} from '../interfaces/category.dto'

interface CategoryInstance
  extends Model<ICategoryAttributes, ICategoryCreationAttributes>,
    ICategoryAttributes {}

export const CategoryModel = sequelize.define<CategoryInstance>(
  'Category',
  {
    ...BaseModelFields,
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    storeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'store',
        key: 'id'
      },
      onDelete: 'CASCADE'
    }
  },
  {
    tableName: 'category',
    timestamps: false,
    paranoid: true,
    underscored: true,
    freezeTableName: true
  }
)
