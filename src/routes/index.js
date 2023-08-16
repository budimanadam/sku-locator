'use strict'
const {getHome, deleteBinItemRecord, postBinItemRecord, getSkuBin} = require('../handler/home');

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

    fastify.route({
        method: 'GET',
        url: '/sku-bin',
        handler: getSkuBin
    });

    fastify.route({
        method: 'DELETE',
        url: '/bin-item/',
        handler: deleteBinItemRecord,
        schema: {
            summary: 'Return Home',
            description: 'Return to Home View and also deletes 1 record in bin_item_activity_id',
            tags: ['Home']
        }
    });

    fastify.route({
        method: 'POST',
        url: '/bin-item/',
        handler: postBinItemRecord,
        schema: {
            summary: 'Return Home',
            description: 'Return to Home View and also post 1 record into bin_item_activity_id',
            tags: ['Home']
        }
    });
}