'use strict'

const { BaseModelFields } = require('../baseModel')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('quiz', {
      ...BaseModelFields,
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT
      },
      category: {
        type: DataTypes.ENUM('general', 'personal'),
        allowNull: false
      }
    })
  },

  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('quiz')
  }
}
