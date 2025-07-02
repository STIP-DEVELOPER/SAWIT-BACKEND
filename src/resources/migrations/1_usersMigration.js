/* eslint-disable @typescript-eslint/space-before-function-paren */
/* eslint-disable @typescript-eslint/no-var-requires */
'use strict'

const { BaseModelFields } = require('../baseModel')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('user', {
      ...BaseModelFields,
      name: {
        type: DataTypes.STRING(80),
        allowNull: false
      },
      whatsapp_number: {
        type: DataTypes.STRING,
        allowNull: true
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      role: {
        type: DataTypes.ENUM('superAdmin', 'admin', 'user'),
        allowNull: false,
        defaultValue: 'user'
      }
    })
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('user')
  }
}
