'use strict'

const { BaseModelFields } = require('../baseModel')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('game_evaluation_answer', {
      ...BaseModelFields,
      answer: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      question_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      game_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      category: {
        type: DataTypes.ENUM('puzzle', 'word'),
        allowNull: true,
        defaultValue: 'puzzle'
      }
    })
  },

  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('game_evaluation_answer')
  }
}
