const getHome = async (req, rep) => {
    let q = '';
    let param = req.query;
    let filter = '';
    if (param && param.q) {
        filter = 'where i.item_code like ? or i.item_name like ? or b.bin_code like ? or b.bin_name like ?';
        q = `%${param.q}%`
    }
    console.log('filter');
    console.log(filter);
    const [skuLocations] = await req.db.execute(`
        select i.item_name, i.item_code, i.stock, b.bin_name, b.bin_code
        from bin_item_activity bia 
        join bin b on b.bin_id = bia.bin_id 
        join item i on i.item_id = bia.item_id 
        ${filter}
    `, [q, q, q, q]);
    return rep.view("/templates/index.ejs", { skuLocations });
}

module.exports = getHome;