'use strict'
const {getItems, postItem} = require('../../handler/item');

module.exports = async function(fastify, opts) {
    fastify.route({
        method: 'GET',
        url: '/',
        handler: getItems,
        schema: {
            summary: 'Return Items',
            description: 'Return to Items View',
            tags: ['items']
        }
    });

    fastify.route({
        method: 'POST',
        url: '/',
        handler: postItem,
        schema: {
            summary: 'Return Items',
            description: 'Return to Items View',
            tags: ['items']
        }
    });
}