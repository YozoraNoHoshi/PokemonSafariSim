const db = require('../db');

async function checkIfDataExists({ table, key, value }) {
  let result = await db.query(`SELECT * from $1 WHERE $2 = $3`, [
    table,
    key,
    value
  ]);
  errorIfNoResult(result.rows);
  return result.rows;
}

function errorIfNoResult(resultArray) {
  if (resultArray.length === 0) {
    console.error('\n\n\nNo matches found in the database\n\n\n');
    let error = new Error('No results found');
    error.status = 404;
    throw error;
  }
}

function partialUpdateBuilder(table, items, key, id) {
  // keep track of item indexes
  // store all the columns we want to update and associate with vals

  let idx = 1;
  let columns = [];

  // filter out keys that start with "_" -- we don't want these in DB
  for (let key in items) {
    if (key.startsWith('_')) {
      delete items[key];
    }
  }

  for (let column in items) {
    columns.push(`${column}=$${idx}`);
    idx += 1;
  }

  // build query
  let cols = columns.join(', ');
  let query = `UPDATE ${table} SET ${cols} WHERE ${key}=$${idx} RETURNING *`;

  let values = Object.values(items);
  values.push(id);

  return { query, values };
}

module.exports = {
  partialUpdateBuilder,
  errorIfNoResult,
  checkIfDataExists
};
