async function getAllItems(req) {
  let q = '';
  let param = req.query;
  let filter = '';
  if (param && param.q) {
    filter = 'where i.item_code like ? or i.item_name like ?';
    q = `%${param.q}%`;
  }
  const [items] = await req.db.execute(`
        select *
        from item i
        ${filter}
    `, [q, q]);
  return items;
}

async function getAllBins(req) {
  let q = '';
  let param = req.query;
  let filter = '';
  if (param && param.q) {
    filter = 'where b.bin_name like ? or b.bin_code like ?';
    q = `%${param.q}%`;
  }
  const [bins] = await req.db.execute(`
        select *
        from bin b
        ${filter}
    `, [q, q]);
  return bins;
}

async function getAllBinItems(req) {
  let q = '';
    let param = req.query;
    // console.log('param.search[value]');
    // console.log(param.search[value]);
    let filter = '';
    if (param && param.q) {
        filter = 'where i.item_code like ? or i.item_name like ? or b.bin_code like ? or b.bin_name like ?';
        q = `%${param.q}%`
    }
    const [skuLocations] = await req.db.execute(`
        select i.item_name, i.item_code, i.stock, b.bin_name, b.bin_code, bia.bin_item_activity_id
        from bin_item_activity bia 
        join bin b on b.bin_id = bia.bin_id 
        join item i on i.item_id = bia.item_id 
        ${filter}
    `, [q, q, q, q]);
    return skuLocations;
}

module.exports = {getAllItems, getAllBins, getAllBinItems};