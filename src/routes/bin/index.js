'use strict'
const {getBins, postBin} = require('../../handler/bin');

module.exports = async function(fastify, opts) {
    fastify.route({
        method: 'GET',
        url: '/',
        handler: getBins,
        schema: {
            summary: 'Return Bins',
            description: 'Return to Bins View',
            tags: ['bins']
        }
    });

    fastify.route({
        method: 'POST',
        url: '/',
        handler: postBin,
        schema: {
            summary: 'Return Bins',
            description: 'Return to Bins View',
            tags: ['bins']
        }
    });
}