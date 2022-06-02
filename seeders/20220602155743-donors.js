'use strict';
const { rand, randFullName, randPastDate } = require('@ngneat/falso')
function getDonor() {
  return {
    name: randFullName(),
    dob: randPastDate(),
    bloodType: rand(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
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
    const donors = [...new Array(20)].map(getDonor);

    await queryInterface.bulkInsert('Donors', donors)
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
