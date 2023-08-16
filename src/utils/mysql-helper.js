const config = require('../config');

// get the client
const mysql = require('mysql2/promise');

// get the promise implementation, we will use bluebird
const bluebird = require('bluebird');


function connect() {
    return mysql.createPool({
    host:config.HOST, 
    user: config.USER, 
    password: config.PASSWORD, 
    database: config.DATABASE, 
    port: config.DB_PORT,
    Promise: bluebird,
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
    idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
  });
}

module.exports = connect;