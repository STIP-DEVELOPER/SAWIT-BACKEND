import { DataTypes } from 'sequelize'
import { sequelize } from '../database/config'
import { BaseModelFields } from '../database/baseModelFields'
import { GameEvaluationAnswerInstance } from '../interfaces/gameEvaluationAnswer/gameEvaluationAnswer.dto'
import { GameEvaluationQuestionModel } from './gameEvaluationQuestionModel'

export const GameEvaluationAnswerModel = sequelize.define<GameEvaluationAnswerInstance>(
  'GameEvelutaionAnswer',
  {
    ...BaseModelFields,
    answer: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    questionId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    gameId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    category: {
      type: DataTypes.ENUM('puzzle', 'word'),
      allowNull: true,
      defaultValue: 'puzzle'
    }
  },
  {
    tableName: 'game_evaluation_answer',
    timestamps: true,
    underscored: true
  }
)

GameEvaluationAnswerModel.belongsTo(GameEvaluationQuestionModel, {
  foreignKey: 'questionId',
  as: 'question'
})
