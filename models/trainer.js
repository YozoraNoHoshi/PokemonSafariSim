const db = require('../db');
const env = require('../config');
const bcrypt = require('bcrypt');
const {
  errorIfNoResult,
  checkIfDataExists
} = require('../helpers/helperFunctions');

class Trainer {
  constructor({ id, name, money }) {
    this._id = id;
    this._name = name;
    this.money = money;
    // Ignore for now
    this.inventory = {};
    this.caughtPokemon = {};
    // this.partyPokemon = [];
  }

  get id() {
    return this._id;
  }
  set id(val) {
    throw new Error('You cannot set the id property of a trainer');
  }
  get name() {
    return this._name;
  }
  set name(val) {
    throw new Error('You cannot set the name property of a trainer');
  }

  static async getAll() {
    let result = await db.query(`SELECT * FROM trainers`);
    return result.rows;
  }

  static async getTrainer({ name }) {
    let resultRows = await checkIfDataExists({
      table: 'trainers',
      key: 'name',
      value: name
    });
    return new Trainer(resultRows[0]);
  }

  static async create({ name, startingMoney }) {
    if (!startingMoney) startingMoney = 500;
    let result = await db.query(
      `INSERT INTO trainers (name, money) VALUES ($1, $2) RETURNING *`,
      [name, startingMoney]
    );
    return result.rows[0];
  }

  // Inventory/Pokemon is handled in a separate function
  static async updateMoney({ money }) {
    let trainer = await checkIfDataExists({
      table: 'trainers',
      key: 'name',
      value: name
    })[0];
    if (!money) money = trainer.money;
    let result = await db.query(`UPDATE trainers SET money = $1 RETURNING *`, [
      money
    ]);
    return new Trainer(result.rows[0]);
  }
  async updateMoney() {
    let result = await db.query(`UPDATE trainers SET money = $1 RETURNING *`, [
      this.money
    ]);
    return result.rows[0];
  }

  static async delete({ name }) {
    await checkIfDataExists({ table: 'trainers', key: 'name', value: name });
    let result = await db.query(
      `DELETE FROM trainers WHERE name = $1 RETURNING *`,
      [name]
    );
    return result.rows[0];
  }

  async delete() {
    let result = await db.query(
      `DELETE FROM trainers WHERE name = $1 RETURNING *`,
      [this.name]
    );
    return result.rows[0];
  }

  // ----- BELOW IS NYI -----

  modifyInventory({ item, quantity }) {
    if (quantity === 0) {
      throw new Error(`Cannot buy or sell 0 of ${item.name}!`);
    }
    if (!this.inventory[item.name]) {
      this.inventory[item.name] = { quantity: 0, item };
    }
    let inventorySlot = this.inventory[item.name];

    // Buying an item if quantity is positive
    if (quantity > 0) {
      if (this.money < quantity * item.price) {
        throw new Error('You do not have enough money!');
      }
      inventorySlot.quantity += quantity;
      this.money -= quantity * item.price;
    } else if (quantity < 0) {
      // Selling an item if quantity is negative
      if (inventorySlot.quantity === 0) {
        throw new Error(`You do not have any ${item.name}!`);
      }
      quantity = Math.abs(quantity);
      this.money += Math.min(inventorySlot.quantity, quantity) * item.price;
      inventorySlot.quantity = Math.max(0, inventorySlot.quantity - quantity);
    }
    return inventorySlot;
  }

  updateCaughtPokemon(pokemon) {
    let caught = this.caughtPokemon;
    if (!caught[pokemon.species]) {
      caught[pokemon.species] = [];
    }
    caught[pokemon.species].push(pokemon);
    return caught[pokemon.species];
  }

  changePartyPokemon(slot1, slot2) {
    // Switch positions of the pokemon in the array, slot1 and slot2 are integers
    this.partyPokemon[slot1] = [
      this.partyPokemon[slot2],
      (this.partyPokemon[slot2] = this.partyPokemon[slot2])
    ][0];
  }
}

module.exports = Trainer;
