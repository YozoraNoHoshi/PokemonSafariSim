const db = require('../db');
// const env = require('../config');
const {
  errorIfNoResult,
  checkIfDataExists
} = require('../helpers/helperFunctions');
const {
  pokeAPIHabitatPokemon,
  pokeAPIGetPokemonData
} = require('../helpers/routeHelpers');
const { Pokemon, WildPokemon } = require('./pokemon');

class Habitat {
  constructor({ name, weather }, pokemon) {
    this.name = name;
    this.weather = weather;
    this.pokemon = pokemon || [];
    // Ignore for now
    this.availablePokemon = [];
  }

  static async create({ name, weather }, pokemon) {
    let result = await db.query(
      `INSERT INTO habitats (name, weather) VALUES ($1, $2) RETURNING *`,
      [name, weather]
    );
    let newHabitat = new Habitat(result.rows[0], pokemon);
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
    if (result.rows.length === 0) return;
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
    // If nothing found in the database for this habitat
    if (result.rows.length === 0) {
      // Gets data for each pokemon name from the pokemon api
      let promises = this.pokemon.map(p => pokeAPIGetPokemonData(p));
      let pokemons = await Promise.all(promises);

      // Creates new pokemon instances and inserts into database and returns it
      let pokemonInstances = pokemons.map(p => {
        p.habitat = this.name;
        return WildPokemon.create(p);
      });
      result = { rows: await Promise.all(pokemonInstances) };
    }
    // Set the instances avail pokemon to the db query result and return it
    this.availablePokemon = result.rows;
    return this.availablePokemon;
  }

  async pickPokemon() {
    // If there are no available Pokemon then get some, and return a random one
    if (this.availablePokemon.length === 0) await this.getAvailPokemon();
    let index = Math.floor(Math.random() * this.availablePokemon.length);
    return this.availablePokemon[index];
  }
}

module.exports = Habitat;
