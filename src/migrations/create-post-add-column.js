'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn ('Posts', 'post_image', { type: Sequelize.STRING });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Posts', 'post_image', { /* query options */ });
  }
};