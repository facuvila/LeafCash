const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getAll(){
  const result = await db.query(
    `SELECT * from userData`
  );
  return result;
}

async function getByIdyCampo(id, campo){
  const result = await db.query(
    `SELECT ${campo} from userData WHERE userId = "${id}"`
  );
  return result;
}



module.exports = {
  getAll,
  getByIdyCampo
}