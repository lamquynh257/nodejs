const { Sequelize } = require('sequelize');


const sequelize = new Sequelize('nodejs', 'nodejs', 'Thanhlam123', {
  host: '203.205.33.59',
  port: 33066,
  dialect: 'mysql',
  logging: false
});

const connecDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}
module.exports = connecDB;