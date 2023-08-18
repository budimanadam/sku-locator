const config = require('../config');

module.exports.systemDb = {
  client: 'pg',
  connection: {
    user: config.SYSTEM_DB_USER,
    database: config.SYSTEM_DB,
    port: parseInt(config.SYSTEM_DB_PORT, 10),
    host: config.SYSTEM_DB_HOST,
    password: config.SYSTEM_DB_PASSWORD,
    poolSize: parseInt(config.SYSTEM_POOL_SIZE, 10)
  }
};


const tenantConfig = {
  client: 'pg',
  connection: {
    user: config.AzureWebJobsTenantUser,
    database: config.AzureWebJobsTenantDb,
    port: parseInt(config.DB_PORT, 10),
    host: config.AzureWebJobsTenantHost,
    password: config.AzureWebJobsTenantPassword,
    poolSize: parseInt(config.TENANT_POOL_SIZE, 10),
    max: parseInt(config.TENANT_POOL_SIZE, 10),
    idleTimeoutMillis: parseInt(config.POOL_IDLE_TIMEOUT, 10)
  }
};

module.exports.tenantConfig = tenantConfig;
