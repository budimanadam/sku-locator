'use strict'
const {getHome, deleteBinItemRecord, postBinItemRecord, getSkuBin, post, exportSkuBin, login, loginPage} = require('../handler/home');
const {auth} = require('../utils/auth')

module.exports = async function(fastify, opts) {
    fastify.route({
        method: 'GET',
        url: '/home',
        handler: getHome,
        schema: {
            summary: 'Return Home',
            description: 'Return to Home View',
            tags: ['Home']
        }
    });

    fastify.route({
        method: 'GET',
        url: '/sku-bin',
        preHandler: [auth],
        handler: getSkuBin
    });

    fastify.route({
        method: 'DELETE',
        url: '/',
        preHandler: [auth],
        handler: deleteBinItemRecord,
        schema: {
            summary: 'Return Home',
            description: 'Return to Home View and also deletes 1 record in bin_item_activity_id',
            tags: ['Home']
        }
    });

    fastify.route({
        method: 'POST',
        url: '/',
        preHandler: [auth],
        handler: postBinItemRecord,
        schema: {
            summary: 'Return Home',
            description: 'Return to Home View and also post 1 record into bin_item_activity_id',
            tags: ['Home']
        }
    });

    fastify.route({
        method: 'GET',
        url: '/export/sku-bin',
        handler: exportSkuBin
    });

    fastify.route({
        method: 'POST',
        url: '/login',
        handler: login
    });
    
    fastify.route({
        method: 'GET',
        url: '/',
        handler: loginPage
    });
}