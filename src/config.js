require('dotenv').config();

const config = {
  HOST: process.env.HOST,
  USER: process.env.USER,
  PASSWORD: process.env.PASSWORD,
  DATABASE: process.env.DATABASE,
  DB_PORT: process.env.DB_PORT,
  PORT: process.env.PORT,
  API_URL: process.env.API_URL
};

module.exports = config;
