const {getAllBinItems, getAllItems, getAllBins} = require('../utils/helper');
const xlsx = require('json-as-xlsx');

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

const exportSkuBin = async (req, rep) => {
    const skuLocations = await getAllBinItems(req);
    let det = [];
    let data = [];
    skuLocations.map((skubin) => {
        det.push({
            bin_code: skubin.bin_code,
            bin_name: skubin.bin_name,
            item_code: skubin.item_code,
            item_name: skubin.item_name
        });
    });

    data.push({
        sheet: `Sku Location`,
        columns: [
            {label: 'Kode Rak', value: 'bin_code'},
            {label: 'Nama Rak', value: 'bin_name'},
            {label: 'SKU', value: 'item_code'},
            {label: 'Nama Barang', value: 'item_name'}
        ],
        content: det
    });
    const current = new Date();
    let settings = {
        fileName: `Sku Location - ${current.toDateString()} .xlsx`,
        extraLength: 3,
        writeMode: "write",
        writeOptions: { bookType: 'xlsx', bookSST: false, type: 'buffer'},
    }
    const result = xlsx(data, settings);
    return rep
        .type('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
        .header('Connection', 'keep-alive')
        .header('Cache-Control', 'no-cache')
        .header('Content-Disposition', `attachment;filename=${settings.fileName}`)
        .code(200).send(result);
}

module.exports = {getHome, deleteBinItemRecord, postBinItemRecord, getSkuBin, post, exportSkuBin};