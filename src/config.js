require('dotenv').config();

const config = {
  HOST: process.env.HOST,
  USER: process.env.USER,
  PASSWORD: process.env.PASSWORD,
  DATABASE: process.env.DATABASE,
  DB_PORT: process.env.DB_PORT,
  PORT: process.env.PORT,
  API_URL: process.env.API_URL || 'https://prod.middleware-integration.com',
  SYSTEM_DB_HOST: '203.194.112.146',
  SYSTEM_DB: 'postgres',
  SYSTEM_DB_PORT: 5432,
  SYSTEM_DB_USER: 'postgres',
  SYSTEM_DB_PASSWORD: 'Qwerty123!',
  SYSTEM_POOL_SIZE: process.env.SYSTEM_POOL_SIZE || 20,
};

module.exports = config;
