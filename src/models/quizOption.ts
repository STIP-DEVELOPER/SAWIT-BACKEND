import { DataTypes } from 'sequelize'
import { sequelize } from '../database/config'
import { BaseModelFields } from '../database/baseModelFields'
import { QuizOptionInstance } from '../interfaces/quizOption/quizOption.dto'

export const QuizOptionModel = sequelize.define<QuizOptionInstance>(
  'QuizOption',
  {
    ...BaseModelFields,
    optionText: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isCorrect: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    questionId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'quiz_question',
        key: 'id'
      },
      onDelete: 'CASCADE'
    }
  },
  {
    tableName: 'quiz_option',
    timestamps: false,
    underscored: true
  }
)
