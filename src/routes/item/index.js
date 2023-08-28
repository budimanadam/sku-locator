'use strict'
const {getItems, postItem, deleteItem, getItemsJson, getAllItem} = require('../../handler/item');
const {auth} = require('../../utils/auth');

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
        preHandler: [auth],
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
        preHandler: [auth],
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
        preHandler: [auth],
        handler: deleteItem,
        schema: {
            summary: 'Return success',
            description: 'Return Success',
            tags: ['items']
        }
    });

    fastify.route({
        method: 'GET',
        url: '/item-list',
        preHandler: [auth],
        handler: getAllItem
    });
}