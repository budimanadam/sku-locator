'use strict'
const {getItems, postItem, deleteItem, getItemsJson} = require('../../handler/item');

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
        method: 'GET',
        url: '/list-item',
        handler: getItemsJson,
        schema: {
            summary: 'Return Items in Json',
            description: 'Return Items List in Json',
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

    fastify.route({
        method: 'DELETE',
        url: '/',
        handler: deleteItem,
        schema: {
            summary: 'Return success',
            description: 'Return Success',
            tags: ['items']
        }
    });
}