import { DataTypes } from 'sequelize'
import { sequelize } from '../database/config'
import { BaseModelFields } from '../database/baseModelFields'
import { QuizInstance } from '../interfaces/quiz/quiz.dto'
import { QuizQuestionModel } from './quizQuestion'

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
    },
    category: {
      type: DataTypes.ENUM('general', 'personal'),
      allowNull: false
    }
  },
  {
    tableName: 'quiz',
    timestamps: true,
    underscored: true
  }
)

QuizModel.hasMany(QuizQuestionModel, {
  foreignKey: 'quizId',
  as: 'questions',
  onDelete: 'CASCADE'
})
