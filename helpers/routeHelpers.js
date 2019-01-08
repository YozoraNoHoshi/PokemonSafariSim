const db = require('../db');
const env = require('../config');
const axios = require('axios');
const Habitat = require('../models/habitat');

async function pokeAPIGetAllHabitats() {
  let pokeAPI = await axios.get(`${env.POKE_API_URL}/pokemon-habitat/`);
  let promises = pokeAPI.data.results.map(h => {
    return axios.get(h.url);
  });
  let allHabitats = await Promise.all(promises);
  let allHabitatsPromises = allHabitats.map(h => {
    return pokeAPICreateHabitat(h.data);
  });
  // Returns a list of habitat instances
  return await Promise.all(allHabitatsPromises);
}

async function pokeAPIGetOneHabitat(habitatName) {
  let habitat = await axios.get(
    `${env.POKE_API_URL}/pokemon-habitat/${habitatName}`
  );
  // Returns a single habitat instance
  return await pokeAPICreateHabitat(habitat.data);
}

async function pokeAPICreateHabitat(habitatData) {
  let { name, pokemon_species } = habitatData;
  let weather = 'normal';
  // pokemon_species.foreach(p => {
  // model call to stick stuff into the pokemon table
  // Stick p.name and the habitat name into the pokemon table, habitat name is also a foreign key
  // return p.name;
  // });
  return Habitat.create({ name, weather }, pokemon_species);
}

async function pokeAPIGetPokemonData(pokemonSpecies) {
  // Takes a pokemon name and returns the data for creating an instance of that pokemon
  let pokemonData = await axios.get(
    `${env.POKE_API_URL}/pokemon-species/${pokemonSpecies}`
  );

  let pokemon = pokemonData.data;
  let { name, capture_rate, gender_rate, id } = pokemon;
  let title = pokemon.genera[2].genus;
  let flavorText = pokemon.flavor_text_entries[2].flavor_text;
  let front_default = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

  // Should return data for creating a Pokemon Instance
  // Needs habitat name attached to it
  return {
    name,
    catchRate: capture_rate,
    genderRate: gender_rate,
    title,
    flavorText,
    frontSprite: front_default
  };
}

module.exports = {
  pokeAPIGetAllHabitats,
  pokeAPIGetOneHabitat,
  pokeAPICreateHabitat,
  pokeAPIGetPokemonData
};
