'use strict'
const {getBins, postBin, deleteBin, getAllBin} = require('../../handler/bin');
const {auth} = require('../../utils/auth');

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
        preHandler: [auth],
        handler: postBin,
        schema: {
            summary: 'Return Bins',
            description: 'Return to Bins View',
            tags: ['bins']
        }
    });

    fastify.route({
        method: 'DELETE',
        url: '/',
        preHandler: [auth],
        handler: deleteBin,
        schema: {
            summary: 'Return success',
            description: 'Return Success',
            tags: ['bins']
        }
    });

    fastify.route({
        method: 'GET',
        url: '/bin-list',
        preHandler: [auth],
        handler: getAllBin
    });
}