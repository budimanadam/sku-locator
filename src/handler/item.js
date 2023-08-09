const {getAllItems} = require('../utils/helper');

const getItems = async (req, rep) => {
    return rep.view("/templates/item.ejs", { items: await getAllItems(req) });
}

const postItem = async (req, rep) => {
    const body = req.body;
    await req.db.execute(`insert into item (item_name, item_code, stock) values (?, ?, ?)`, [body.item_name, body.item_code, body.stock]);
    return rep.view("/templates/item.ejs", { items: await getAllItems(req) });
};

module.exports = {getItems, postItem};