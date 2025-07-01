import { DataTypes } from 'sequelize'
import { sequelize } from '../database/config'
import { BaseModelFields } from '../database/baseModelFields'
import { QuizResultInstance } from '../interfaces/quizResult/quizResult.dto'

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
