const {getAllItems,} = require('../utils/helper');

const getItems = async (req, rep) => {
    return rep.view("/templates/item.ejs", { items: await getAllItems(req) });
}

const getItemsJson = async (req, rep) => {
    return rep.code(200).send({success: 'ok', data: await getAllItems(req)});
}

const postItem = async (req, rep) => {
    const body = req.body;
    await req.systemDb.query(`insert into item (item_name, item_code, stock) values ($1, $2, $3)`, [body.item_name, body.item_code, body.stock]);
    return rep.view("/templates/item.ejs", { items: await getAllItems(req) });
};

const deleteItem = async (req, rep) => {
    await req.systemDb.query(`delete from item where item_id = $1`, [req.body.item_id]);
    return rep.code(200).send({success: 'ok'});
}

module.exports = {getItems, postItem, deleteItem, getItemsJson};