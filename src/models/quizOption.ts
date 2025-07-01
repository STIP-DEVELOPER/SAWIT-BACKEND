import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../database/config'
import { BaseModelFields } from '../database/baseModelFields'

interface QuizOptionAttributes {
  optionText: string
  isCorrect: boolean
  questionId: number
}

interface QuizOptionInstance extends Model<QuizOptionAttributes>, QuizOptionAttributes {}

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
    paranoid: true,
    underscored: true
  }
)
