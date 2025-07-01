import { DataTypes } from 'sequelize'
import { sequelize } from '../database/config'
import { BaseModelFields } from '../database/baseModelFields'
import { QuizInstance } from '../interfaces/quiz/quiz.dto'

export const QuizModel = sequelize.define<QuizInstance>(
  'Quiz',
  {
    ...BaseModelFields,
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    }
  },
  {
    tableName: 'quiz',
    timestamps: true,
    paranoid: true,
    underscored: true
  }
)
