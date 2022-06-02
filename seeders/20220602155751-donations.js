'use strict';
const { randPastDate, randNumber } = require('@ngneat/falso')

function getDonation() {
  return {
    DonorId: randNumber({ min: 1, max: 20 }),
    createdAt: randPastDate(),
    updatedAt: randPastDate()
  }
}

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
    const donations = [...new Array(100)].map(getDonation);

    await queryInterface.bulkInsert('Donations', donations)
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
