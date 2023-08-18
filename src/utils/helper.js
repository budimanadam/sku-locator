async function getAllItems(req) {
  let q = '';
  let param = req.query;
  let filter = '';
  if (param && param.q) {
    filter = 'where i.item_code like $1 or i.item_name like $1';
    q = `%${param.q}%`;
  }
  const items = await req.systemDb.query(`
        select *
        from item i
        ${filter}
    `, [q]);
  return items;
}

async function getAllBins(req) {
  let q = '';
  let param = req.query;
  let filter = '';
  if (param && param.q) {
    filter = 'where b.bin_name like $1 or b.bin_code like $1';
    q = `%${param.q}%`;
  }
  const bins = await req.systemDb.query(`
        select *
        from bin b
        ${filter}
    `, [q]);
  return bins;
}

async function getAllBinItems(req) {
  let q = '';
    let param = req.query;
    let filter = '';
    if (param && param.q) {
        filter = 'where i.item_code ilike $1 or i.item_name ilike $1 or b.bin_code ilike $1 or b.bin_name ilike $1';
        q = `%${param.q}%`
    }
    const skuLocations = await req.systemDb.query(`
        select i.item_name, i.item_code, i.stock, b.bin_name, b.bin_code, bia.bin_item_activity_id
        from bin_item_activity bia 
        join bin b on b.bin_id = bia.bin_id 
        join item i on i.item_id = bia.item_id 
        ${filter}
    `, [q]);
    return skuLocations;
}

module.exports = {getAllItems, getAllBins, getAllBinItems};