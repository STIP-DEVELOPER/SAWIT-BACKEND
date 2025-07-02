'use strict'

const { BaseModelFields } = require('../baseModel')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('quiz_result', {
      ...BaseModelFields,
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'user',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      quiz_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'quiz',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      score: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      }
    })
  },

  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('quiz_result')
  }
}
