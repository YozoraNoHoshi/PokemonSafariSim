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

  buyItem(item, quantity) {
    if (this.money < quantity * item.price) {
      throw new Error('You do not have enough money!');
    }
    let inventorySlot = this.inventory[item.name] || { quantity: 0, item };
    inventorySlot.quantity += quantity;
    return inventorySlot;
  }

  sellItem(item, quantity) {
    if (!this.inventory[item.name]) {
      throw new Error(`You do not have any ${item.name}!`);
    }
    let inventoryQuantity = this.inventory[item.name].quantity;
    inventoryQuantity = Math.max(0, inventoryQuantity - quantity);
    return inventoryQuantity;
  }

  changePartyPokemon(slot1, slot2) {
    this.partyPokemon[slot1] = [
      this.partyPokemon[slot2],
      (this.partyPokemon[slot2] = this.partyPokemon[slot2])
    ][0];
  }

  updateCaughtPokemon(pokemon) {
    let pokemonSlot = this.caughtPokemon[pokemon.species];
    if (!pokemonSlot) {
      pokemonSlot = [];
    }
    pokemonSlot.push(pokemon);
    return pokemonSlot;
  }
}

module.exports = Trainer;
