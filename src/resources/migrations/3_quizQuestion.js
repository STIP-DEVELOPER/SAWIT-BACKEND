'use strict'

const { BaseModelFields } = require('../baseModel')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('quiz_question', {
      ...BaseModelFields,
      question_text: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      quiz_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'quiz',
          key: 'id'
        },
        onDelete: 'CASCADE'
      }
    })
  },

  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('quiz_question')
  }
}
