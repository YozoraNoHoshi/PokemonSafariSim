const db = require('../db');
const env = require('../config');
const axios = require('axios');

class PokeMart {
  constructor() {
    this.inventory = {};
    this.stockMart();
  }
  static stockMart() {
    // Fills inventory with entries from the our database for items
  }
  static getItems() {
    // All items
    // https://pokeapi.co/api/v2/item-category/
    // Pokeballs
    // https://pokeapi.co/api/v2/item-pocket/3/
    // Healing
    // https://pokeapi.co/api/v2/item-category/27/
    // Revives
    // https://pokeapi.co/api/v2/item-category/29/
    // Request pokemon api for the specified item, store results into database.
    // Query pokemon api for all the existing items and prices, return a array with key of item names: { item name, price, description}
    // [] item name 1:{ item name, price, description }, item name 2: {item name, price, description}... etc]
  }
  static getItem(itemName) {
    // Gets data for an item in the Pokemart
  }
}

class Item {
  constructor({ name, price, description }) {
    this.name = name;
    this.price = price;
    this.description = description;
  }
}

class PokeBall extends Item {
  constructor({ name, price, description }) {
    super({ name, price, description });
    this.category = 'pokeball';
  }
}

class BattleItem extends Item {
  constructor({ name, price, description }) {
    super({ name, price, description });
    this.category = 'battleitem';
  }
}

module.export = { PokeMart, PokeBall, BattleItem };
