'use strict';
const { randPastDate } = require('@ngneat/falso')

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Admins', [
      {
        username: 'rmcmillan',
        password: '$2b$10$ddZk.OpRYV4xWZ521UMEf.5n4TapwmauDgwegLH99fD6tdDQRRihq',
        createdAt: randPastDate(),
        updatedAt: randPastDate()
      },
      {
        username: 'mdeboer',
        password: 'password1',
        createdAt: randPastDate(),
        updatedAt: randPastDate()
      },
      {
        username: 'mnguyen',
        password: 'password2',
        createdAt: randPastDate(),
        updatedAt: randPastDate()
      },
      {
        username: 'khuskey',
        password: 'password3',
        createdAt: randPastDate(),
        updatedAt: randPastDate()
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
