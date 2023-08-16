const Promise = require('bluebird');
const pgp = require('pg-promise');
const db = require('./db');

// 1114 is OID for timestamp in Postgres
Date.prototype.toPostgres  = (value) => {
  // format Date as a local timestamp;
  return pgp.as.date(value);
};

const pgPromise = pgp({
  promiseLib: Promise // overriding the default (ES6 Promise);
});

const connections = {};

function getConnection(host) {
  let connection = connections[host];
  if (!connection) {
    const cfg = Object.assign({}, db.tenantConfig.connection);
    cfg.host = host;
    connection = pgPromise(cfg);
    connections[host] = connection;
  }
  return connection;
}

module.exports.pgSysDb = pgPromise(db.systemDb.connection);
module.exports.getConnection = getConnection;
module.exports.Helpers = pgPromise.helpers;
module.exports.qrm = pgp.queryResult;
module.exports.format = pgp.as.format;
