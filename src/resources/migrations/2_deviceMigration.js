'use strict'

const { BaseModelFields } = require('../baseModel')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('device', {
      ...BaseModelFields,
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      status: {
        type: DataTypes.ENUM('active', 'inactive', 'maintenance'),
        allowNull: false,
        defaultValue: 'active'
      },
      fertilizer_volume: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      fertilize_type: {
        type: DataTypes.ENUM(
          'NPK',
          'UREA',
          'DOLOMIT',
          'MOP',
          'KIESERITE',
          'ROCK PHOSPHATE'
        ),
        allowNull: false,
        defaultValue: 'NPK'
      },
      speed: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      token: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      }
    })
  },

  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('device')
  }
}
