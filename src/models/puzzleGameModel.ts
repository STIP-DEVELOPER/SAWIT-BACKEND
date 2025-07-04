import { DataTypes } from 'sequelize'
import { sequelize } from '../database/config'
import { BaseModelFields } from '../database/baseModelFields'
import { PuzzleGameInstance } from '../interfaces/puzzleGame/puzzleGame.dto'

export const PuzzleGameModel = sequelize.define<PuzzleGameInstance>(
  'PuzzleGame',
  {
    ...BaseModelFields,
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },
  {
    tableName: 'puzzle_game',
    timestamps: true,
    underscored: true
  }
)
