import { DataTypes } from 'sequelize'
import { sequelize } from '../database/config'
import { QuizQuestionInstance } from '../interfaces/quizQuestion/quizQuestion.dto'
import { BaseModelFields } from '../database/baseModelFields'
import { QuizOptionModel } from './quizOption'

export const QuizQuestionModel = sequelize.define<QuizQuestionInstance>(
  'QuizQuestion',
  {
    ...BaseModelFields,
    questionText: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    quizId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'quiz',
        key: 'id'
      },
      onDelete: 'CASCADE'
    }
  },
  {
    tableName: 'quiz_question',
    timestamps: false,
    paranoid: true,
    underscored: true
  }
)

QuizQuestionModel.hasMany(QuizOptionModel, {
  foreignKey: 'questionId',
  as: 'options',
  onDelete: 'CASCADE'
})
