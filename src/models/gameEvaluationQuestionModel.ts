import { DataTypes } from 'sequelize'
import { sequelize } from '../database/config'
import { BaseModelFields } from '../database/baseModelFields'
import { GameEvaluationQuestionInstance } from '../interfaces/gameEvaluationQuestion/gameEvaluationQuestion.dto'

export const GameEvaluationQuestionModel =
  sequelize.define<GameEvaluationQuestionInstance>(
    'GameEvelutaionQuestion',
    {
      ...BaseModelFields,
      question: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      gameId: {
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
      tableName: 'game_evaluation_question',
      timestamps: true,
      underscored: true
    }
  )
