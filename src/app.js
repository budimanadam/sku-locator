'use strict'

const path = require('path')
const AutoLoad = require('@fastify/autoload')
const connect = require('./utils/mysql-helper');
const { pgSysDb } = require('./utils/postgres-helper');

// Pass --options via CLI arguments in command to enable these options.
module.exports.options = {}

module.exports = async function (fastify, opts) {

  // This loads and sets @fastify/swagger
  fastify.register(require('@fastify/swagger'), {})
  fastify.register(require('@fastify/swagger-ui'), {
    routePrefix: '/docs'
  })

  fastify.register(require("@fastify/view"), {
    engine: {
      ejs: require("ejs"),
    },
  });

  fastify.register(require('@fastify/formbody'))
  fastify.register(require('@fastify/multipart'))

  // This loads all plugins defined in routes
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: Object.assign({}, opts)
  })

  // This loads all plugins defined in routes
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'templates'),
    options: Object.assign({}, opts)
  })

  fastify.addHook('onRequest', (request, reply, hookDone) => {
    // request.db = connect();
    request.systemDb = pgSysDb;
    hookDone();
  })

  fastify.ready(err => {
    if (err) throw err
    fastify.swagger()
  })
}
