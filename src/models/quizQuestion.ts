import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../database/config'
import { BaseModelFields } from '../database/baseModelFields'

interface QuizQuestionAttributes {
  questionText: string
  quizId: number
}

interface QuizQuestionInstance
  extends Model<QuizQuestionAttributes>,
    QuizQuestionAttributes {}

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
