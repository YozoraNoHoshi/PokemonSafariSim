const db = require('../db');
const env = require('../config');
const { buildQuery } = require('../helpers/helperFunctions');

class Pokemon {
  constructor({ name, title, flavorText, frontSprite, genderRate }) {
    this.name = name;
    this.title = title;
    this.flavorText = flavorText;
    this.frontSprite = frontSprite;
    this.genderRate = genderRate;
  }
}
// class CaughtPokemon extends Pokemon {
//   constructor({
//     number,
//     type,
//     spriteFront,
//     shiny,
//     species,
//     stats,
//     trainer,
//     level,
//     friendship,
//     name,
//     moves
//   }) {
//     super({ number, type, spriteFront, shiny, species, stats });
//     this.level = level;
//     this.moves = moves;
//     this.name = name || species;
//     this.friendship = friendship || 50;
//     this.trainer = trainer;
//     this.inParty = false;
//   }
// }

class WildPokemon extends Pokemon {
  constructor({
    name,
    catchRate,
    genderRate,
    title,
    flavorText,
    frontSprite,
    habitat
  }) {
    super({ name, title, flavorText, frontSprite, genderRate });
    this.catchRate = catchRate;
    this.habitat = habitat;
  }

  static async create({
    name,
    catchRate,
    genderRate,
    title,
    flavorText,
    frontSprite,
    habitat
  }) {
    let result = db.query(
      `INSERT INTO pokemon (name, catch_rate, gender_rate, title, flavor_text, front_sprite, habitat) 
      VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [name, catchRate, genderRate, title, flavorText, frontSprite, habitat]
    );
    let pokemon = result.rows[0];
    return new WildPokemon(pokemon);
  }

  static async createMany(pokemonDataArray) {
    // Returns a list of new pokemon
    // TODO
    // Build out a db query for inserting data
    let { query, values } = buildQuery(pokemonDataArray);
    let result = db.query(query, values);
    return result.rows.map(pokeData => {
      return new WildPokemon(pokeData);
    });
  }
  // Species
  // https://pokeapi.co/api/v2/pokemon-species/
  // Habitats
  // https://pokeapi.co/api/v2/pokemon-habitat/

  // Pal Park Areas
  // https://pokeapi.co/api/v2/pal-park-area/
  // Note: pal park areas will use safari style battles - probably do this first

  // exportToCaught({ friendship, trainer }) {
  //   return {
  //     number: this.number,
  //     type: this.type,
  //     spriteFront: this.spriteFront,
  //     shiny: this.shiny,
  //     species: this.species,
  //     stats: this.stats,
  //     moves: this.moves,
  //     level: this.level,
  //     friendship,
  //     trainer
  //   };
  // }
}

module.exports = { Pokemon, WildPokemon };
