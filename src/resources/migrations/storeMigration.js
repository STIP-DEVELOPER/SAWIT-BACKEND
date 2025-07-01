'use strict'

const { BaseModelFields } = require('../baseModel')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('category', {
      ...BaseModelFields,
      store_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false
      }
    })
  },

  async down(queryInterface) {
    await queryInterface.dropTable('category')
  }
}
