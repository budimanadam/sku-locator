const {getAllBinItems, getAllItems, getAllBins} = require('../utils/helper');

const getHome = async (req, rep) => {
    return rep.view("/templates/index.ejs", { skuLocations: await getAllBinItems(req), items: await getAllItems(req), bins: await getAllBins(req) });
}

const deleteBinItemRecord = async (req, rep) => {
    await req.db.execute(`delete from bin_item_activity where bin_item_activity_id = ?`, [req.body.bin_item_activity_id]);
    return rep.code(200).send({success: 'ok'});
}

const postBinItemRecord = async (req, rep) => {
    await req.db.execute(`
        INSERT INTO bin_item_activity (bin_id , item_id) 
        values ((select bin_id from bin where bin_code = ?), (select item_id from item where item_code = ?))`, [req.body.bin_id, req.body.item_id]);
    return rep.view("/templates/index.ejs", { skuLocations: await getAllBinItems(req), items: await getAllItems(req), bins: await getAllBins(req) });

}

module.exports = {getHome, deleteBinItemRecord, postBinItemRecord};