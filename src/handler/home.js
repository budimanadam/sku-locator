const {getAllBinItems, getAllItems, getAllBins} = require('../utils/helper');

const getHome = async (req, rep) => {
    let param = req.query;
    if (!param.page) {
        param.page = 1;
    }
    if (!param.pageSize) {
        param.pageSize = 5;
    }
    return rep.view("/templates/index.ejs", { skuLocations: await getAllBinItems(req), items: await getAllItems(req), bins: await getAllBins(req) });
}

const getList = async (req, rep) => {
    let param = req.query;
    if (!param.page) {
        param.page = 1;
    }
    if (!param.pageSize) {
        param.pageSize = 5;
    }
    console.log('await getAllBinItems(req)');
    console.log(await getAllBinItems(req));
    const res = await getAllBinItems(req);
    return rep.code(200).send({data: res});
}

const deleteBinItemRecord = async (req, rep) => {
    await req.db.execute(`delete from bin_item_activity where bin_item_activity_id = ?`, [req.body.bin_item_activity_id]);
    return rep.code(200).send({success: 'ok'});
}

const postBinItemRecord = async (req, rep) => {
    await req.db.execute(`
        INSERT INTO bin_item_activity (bin_id , item_id) 
        values ((select bin_id from bin where bin_code = ?), (select item_id from item where item_code = ?))`, [req.body.bin_id, req.body.item_id]);
    let param = req.query;
    if (!param.page) {
        param.page = 1;
    }
    if (!param.pageSize) {
        param.pageSize = 5;
    }
    return rep.view("/templates/index.ejs", { skuLocations: await getAllBinItems(req), items: await getAllItems(req), bins: await getAllBins(req) });

}

module.exports = {getHome, deleteBinItemRecord, postBinItemRecord, getList};