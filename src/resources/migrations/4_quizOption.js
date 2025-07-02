'use strict'

const { BaseModelFields } = require('../baseModel')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('quiz_option', {
      ...BaseModelFields,
      option_text: {
        type: DataTypes.STRING,
        allowNull: false
      },
      is_correct: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      question_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'quiz_question',
          key: 'id'
        },
        onDelete: 'CASCADE'
      }
    })
  },

  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('quiz_option')
  }
}
