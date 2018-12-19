const db = require('../db');
const env = require('../config');

class Pokemon {
  constructor({ number, type, spriteFront, shiny, species, stats }) {
    this.number = number;
    this.type = type;
    this.spriteFront = spriteFront;
    this.shiny = shiny;
    this.species = species;
    this.stats = stats;
  }
}
class CaughtPokemon extends Pokemon {
  constructor({
    number,
    type,
    spriteFront,
    shiny,
    species,
    stats,
    trainer,
    level,
    friendship,
    name,
    moves
  }) {
    super({ number, type, spriteFront, shiny, species, stats });
    this.level = level;
    this.moves = moves;
    this.name = name || species;
    this.friendship = friendship || 50;
    this.trainer = trainer;
    this.inParty = false;
  }
}

class WildPokemon extends Pokemon {
  constructor({
    number,
    type,
    spriteFront,
    shiny,
    species,
    stats,
    level,
    moves,
    catchRate,
    habitat,
    threat,
    fleeChance
  }) {
    super({ number, type, spriteFront, shiny, stats, species });
    this.level = level;
    this.moves = moves;
    this.catchRate = catchRate;
    this.habitat = habitat;
    this.threat = threat;
    this.fleeChance = fleeChance;
  }
  // Species
  // https://pokeapi.co/api/v2/pokemon-species/
  // Habitats
  // https://pokeapi.co/api/v2/pokemon-habitat/

  // Pal Park Areas
  // https://pokeapi.co/api/v2/pal-park-area/
  // Note: pal park areas will use safari style battles - probably do this first

  exportToCaught({ friendship, trainer }) {
    return {
      number: this.number,
      type: this.type,
      spriteFront: this.spriteFront,
      shiny: this.shiny,
      species: this.species,
      stats: this.stats,
      moves: this.moves,
      level: this.level,
      friendship,
      trainer
    };
  }
}

module.exports = { Pokemon, CaughtPokemon, WildPokemon };
