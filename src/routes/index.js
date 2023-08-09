'use strict'
const getHome = require('../handler/home');

module.exports = async function(fastify, opts) {
    fastify.route({
        method: 'GET',
        url: '/',
        handler: getHome,
        schema: {
            summary: 'Return Home',
            description: 'Return to Home View',
            tags: ['Home']
        }
    });
}