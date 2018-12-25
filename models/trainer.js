const db = require('../db');
const env = require('../config');
const bcrypt = require('bcrypt');

class Trainer {
  constructor({ id, name, money }) {
    this._id = id;
    this.name = name;
    this.money = money;
    this.inventory = {};
    this.partyPokemon = [];
    this.caughtPokemon = {};
  }

  get id() {
    return this._id;
  }
  set id(val) {
    throw new Error('You cannot set the id property of a trainer');
  }

  static async create(name) {
    let result = await db.query(
      `INSERT INTO trainers () VALUES () RETURNING *`,
      []
    );
    return result.rows[0];
  }
  buyItem(item) {}
  sellItem(item) {}
  changePartyPokemon(slot1, slot2) {}
  upateCaughtPokemon(pokemon) {}
}

module.exports = Trainer;
