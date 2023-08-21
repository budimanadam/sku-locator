const {getAllBinItems, getAllItems, getAllBins} = require('../utils/helper');

const getHome = async (req, rep) => {
    const bins = await getAllBins(req);
    const items = await getAllItems(req);
    const skuLocations = await getAllBinItems(req);
    return rep.view("/templates/index.ejs", { skuLocations, items, bins});
}

const getSkuBin = async (req, rep) => {
    const skuLocations = await getAllBinItems(req);
    return rep.code(200).send({success: 'ok', data: skuLocations});
}

const deleteBinItemRecord = async (req, rep) => {
    await req.systemDb.query(`delete from bin_item_activity where bin_item_activity_id = $1`, [req.body.bin_item_activity_id]);
    return rep.code(200).send({success: 'ok'});
}

const postBinItemRecord = async (req, rep) => {
    if (req.body.bin_id && req.body.item_id) {
        await req.systemDb.query(`
        INSERT INTO bin_item_activity (bin_id , item_id) 
        values ((select bin_id from bin where bin_id = $1 limit 1), (select item_id from item where item_id = $2 limit 1))`, [req.body.bin_id, req.body.item_id]);
    }
    return rep.code(200).send({success: 'ok'});
}

const post = async (req, rep) => {
    return rep.view("/templates/index.ejs", { skuLocations: await getAllBinItems(req), items: await getAllItems(req), bins: await getAllBins(req)});
}

module.exports = {getHome, deleteBinItemRecord, postBinItemRecord, getSkuBin, post};