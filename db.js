const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    operatorsAliases: false,
  }
);
const check = async () => {
  try {
   await sequelize.authenticate();
    console.log('Connected to DB');
  } catch (e) {
    console.log(`Error ${e}`);
  }
};

check();

module.exports = sequelize;
