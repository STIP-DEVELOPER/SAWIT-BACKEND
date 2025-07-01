import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../database/config'
import { BaseModelFields } from '../database/baseModelFields'

interface QuizResultAttributes {
  userId: number
  quizId: number
  score: number
}

interface QuizResultInstance extends Model<QuizResultAttributes>, QuizResultAttributes {}

export const QuizResultModel = sequelize.define<QuizResultInstance>(
  'QuizResult',
  {
    ...BaseModelFields,
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    quizId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'quiz',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    score: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  },
  {
    tableName: 'quiz_result',
    timestamps: false,
    paranoid: true,
    underscored: true
  }
)
