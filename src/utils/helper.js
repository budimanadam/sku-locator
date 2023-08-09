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

module.exports = {getAllItems, getAllBins};