const express = require('express');
const router = new express.Router();
const Habitat = require('../models/habitat');
const {
  pokeAPIGetAllHabitats,
  pokeAPIGetOneHabitat
} = require('../helpers/routeHelpers');
// const jwt = require('jsonwebtoken');
const env = require('../config');

// Shows all habitats available
router.get('/', async function(req, res, next) {
  try {
    let habitats = await Habitat.getAll();
    if (habitats.length > 0) {
      return res.json(habitats);
    } else {
      // Promise.all a bunch of different habitats, punt it to the database after
      habitats = await pokeAPIGetAllHabitats();
      return res.json(habitats);
    }
  } catch (error) {
    return next(error);
  }
});

// Shows the pokemon that can be battled within a habitat
router.get('/:habitat', async function(req, res, next) {
  try {
    let habitat = await Habitat.getHabitat(req.params.habitat);
    if (habitat) {
      let habitatPokemon = await habitat.getAvailPokemon();
      return res.json(habitatPokemon);
    } else {
      // After resolve, punt it into database using habitat static create
      let results = await pokeAPIGetOneHabitat(req.params.habitat);
      return res.json(results);
    }
    // Get all Pokemon inside the current habitat.
  } catch (error) {
    return next(error);
  }
});

// Trigger a wild pokemon encounter (returns a pokemon instance)
router.get('/:habitat/battle', async function(req, res, next) {
  try {
    // get the data for a specific pokemon and send it to the user
    let habitat = await Habitat.getHabitat(req.params.habitat);
    let pokemon = await habitat.pickPokemon();
    return res.json(pokemon);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
