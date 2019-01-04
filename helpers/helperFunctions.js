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

module.exports = {
  errorIfNoResult,
  checkIfDataExists
};
