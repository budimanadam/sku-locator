const {getAllBins} = require('../utils/helper');

const getBins = async (req, rep) => {
    return rep.view("/templates/bin.ejs", { bins: await getAllBins(req) });
}

const postBin = async (req, rep) => {
    const body = req.body;
    await req.db.execute(`insert into bin (bin_name, bin_code) values (?, ?)`, [body.bin_name, body.bin_code]);
    return rep.view("/templates/bin.ejs", { bins: await getAllBins(req) });
};

module.exports = {getBins, postBin};