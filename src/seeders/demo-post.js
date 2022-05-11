'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Posts', [{
      // post_title: DataTypes.STRING,
      // post_content: DataTypes.STRING,
      // post_author: DataTypes.STRING,
      // post_date: DataTypes.STRING,
      post_title: 'Bài viết đầu tiên',
      post_content: 'Ad minim aliquip laboris tempor veniam cupidatat excepteur sint occaecat deserunt incididunt aliqua do mollit. Deserunt dolore duis irure dolore fugiat reprehenderit occaecat ut occaecat cupidatat Lorem. Enim quis ex aliquip dolore enim eiusmod laboris proident pariatur enim consequat adipisicing aliqua. Sunt do anim magna proident in dolor aliquip anim fugiat enim enim esse. Laborum id nostrud mollit nisi dolor. Nulla Lorem magna est consequat irure tempor do ex.',
      post_author: 'ntlam',
      post_date: '11/05/2022',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
