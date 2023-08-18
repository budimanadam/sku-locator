const {getAllBins} = require('../utils/helper');

const getBins = async (req, rep) => {
    return rep.view("/templates/bin.ejs", { bins: await getAllBins(req)});
}

const postBin = async (req, rep) => {
    const body = req.body;
    await req.systemDb.query(`insert into bin (bin_name, bin_code) values ($1, $2)`, [body.bin_name, body.bin_code]);
    return rep.view("/templates/bin.ejs", { bins: await getAllBins(req)});
};

const deleteBin = async (req, rep) => {
    await req.systemDb.query(`delete from bin where bin_id = $1`, [req.body.bin_id]);
    return rep.code(200).send({success: 'ok'});
}

module.exports = {getBins, postBin, deleteBin};