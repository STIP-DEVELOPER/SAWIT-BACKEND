/* eslint-disable @typescript-eslint/space-before-function-paren */
'use strict'
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        id: 1,
        name: 'user',
        email: 'user@mail.com',
        password: 'cf7c906bfbb48e72288fc016bac0e6ed58b0dc2a',
        role: 'user'
      },
      {
        id: 2,
        name: 'admin',
        email: 'admin@mail.com',
        password: 'cf7c906bfbb48e72288fc016bac0e6ed58b0dc2a',
        role: 'admin'
      },
      {
        id: 3,
        name: 'superAdmin',
        email: 'superAdmin@mail.com',
        password: 'cf7c906bfbb48e72288fc016bac0e6ed58b0dc2a',
        role: 'superAdmin'
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {})
  }
}
