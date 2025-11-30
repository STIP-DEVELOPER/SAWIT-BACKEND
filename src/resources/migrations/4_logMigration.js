'use strict'

const { BaseModelFields } = require('../baseModel')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('log', {
      ...BaseModelFields,
      device_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      device_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      message: {
        type: DataTypes.STRING,
        allowNull: false
      },
      level: {
        type: DataTypes.ENUM('info', 'warning', 'error'),
        allowNull: false,
        defaultValue: 'info'
      }
    })
  },

  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('log')
  }
}
