const {getAllBins} = require('../utils/helper');

const getBins = async (req, rep) => {
    return rep.view("/templates/bin.ejs", { bins: await getAllBins(req) });
}

const postBin = async (req, rep) => {
    const body = req.body;
    await req.db.execute(`insert into bin (bin_name, bin_code) values (?, ?)`, [body.bin_name, body.bin_code]);
    return rep.view("/templates/bin.ejs", { bins: await getAllBins(req) });
};

const deleteBin = async (req, rep) => {
    await req.db.execute(`delete from bin where bin_id = ?`, [req.body.bin_id]);
    return rep.code(200).send({success: 'ok'});
}

module.exports = {getBins, postBin, deleteBin};