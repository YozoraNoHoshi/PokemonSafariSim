const db = require('../db');
const env = require('../config');
const bcrypt = require('bcrypt');

class Trainer {
  constructor({ id, name, money }) {
    this.id = id;
    this.name = name;
    this.money = money;
    this.inventory = {};
    this.partyPokemon = [];
    this.caughtPokemon = {};
  }
  static create(name) {
    let result = db.query(`INSERT INTO trainers () VALUES () RETURNING *`, []);
    return result.rows[0];
  }
  buyItem(item) {}
  sellItem(item) {}
  changePartyPokemon(slot1, slot2) {}
  upateCaughtPokemon(pokemon) {}
}

module.exports = Trainer;
