'use strict'

const { BaseModelFields } = require('../baseModel')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('category', {
      ...BaseModelFields,
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      store_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'store',
          key: 'id'
        },
        onDelete: 'CASCADE'
      }
    })
  },

  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('category')
  }
}
