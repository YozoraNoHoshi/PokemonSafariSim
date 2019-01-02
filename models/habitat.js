const db = require('../db');
const env = require('../config');
const {
  errorIfNoResult,
  checkIfDataExists
} = require('../helpers/helperFunctions');

class Habitat {
  constructor({ name, weather }) {
    this.name = name;
    this.weather = weather;
    // Ignore for now
    this.availablePokemon = [];
  }

  static async create({ name, weather }) {
    let result = await db.query(
      `INSERT INTO habitats (name, weather) VALUES ($1, $2) RETURNING *`,
      [name, weather]
    );
    let newHabitat = new Habitat(result.rows[0]);
    return newHabitat;
  }

  static async getAll() {
    let result = await db.query(`SELECT * FROM habitats`);
    if (result.rows.length === 0) {
      // use axios to get habitats
    }
    let habitats = result.rows.map(r => new Habitat(r));
    return habitats;
  }

  static async getHabitat(name) {
    let result = await db.query(`SELECT * FROM habitats WHERE name = $1`, [
      name
    ]);
    if (result.rows.length === 0) return [];
    let habitat = new Habitat(result.rows[0]);
    return habitat;
  }

  static async updateHabitat({ name, weather }) {
    let result = await db.query(
      `UPDATE habitats SET weather = $1 WHERE name = $2 RETURNING *`,
      [weather, name]
    );
    errorIfNoResult(result.rows);
    let habitat = new Habitat(result.rows[0]);
    return habitat;
  }

  static async delete(name) {
    await checkIfDataExists({ table: 'habitats', key: 'name', value: name });
    let result = await db.query(
      `DELETE FROM habitats WHERE name = $1 RETURNING *`,
      [name]
    );
    return result;
  }

  async getAvailPokemon() {
    let result = await db.query(`SELECT * FROM pokemon WHERE habitat = $1`, [
      this.name
    ]);
    if (result.rows.length === 0) {
      // use axios to populate database from the pokemon api
    }
    this.availablePokemon = result.rows;
    return this.availablePokemon;
  }

  async pickPokemon() {
    await this.getAvailPokemon();
    let index = Math.floor(Math.random() * this.availablePokemon.length);
    return this.availablePokemon[index];
  }
}

module.exports = Habitat;
