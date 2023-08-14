const {getAllItems,} = require('../utils/helper');

const getItems = async (req, rep) => {
    return rep.view("/templates/item.ejs", { items: await getAllItems(req) });
}

const getItemsJson = async (req, rep) => {
    return rep.code(200).send({success: 'ok', data: await getAllItems(req)});
}

const postItem = async (req, rep) => {
    const body = req.body;
    await req.db.execute(`insert into item (item_name, item_code, stock) values (?, ?, ?)`, [body.item_name, body.item_code, body.stock]);
    return rep.view("/templates/item.ejs", { items: await getAllItems(req) });
};

const deleteItem = async (req, rep) => {
    try {
        await req.db.execute(`delete from item where item_id = ?`, [req.body.item_id]);
        return rep.code(200).send({success: 'ok'});   
    } catch (error) {
        throw error;
    }
}

module.exports = {getItems, postItem, deleteItem, getItemsJson};