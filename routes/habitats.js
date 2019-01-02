const express = require('express');
const axios = require('axios');
const router = new express.Router();
const Habitat = require('../models/habitat');
// const jwt = require('jsonwebtoken');
// const env = require('../config');

// Shows all habitats available
router.get('/', async function(req, res, next) {
  try {
    let habitats = Habitat.get();
    if (habitats.length > 1) {
      // process stuff and hand back json of all avail habitats
    } else {
      let results = await axios.get('//PokemonUrl');
      return res.json(results);
    }
  } catch (error) {
    return next(error);
  }
});

// Shows the pokemon that can be battled within a habitat
router.get('/:habitat', async function(req, res, next) {
  try {
    // Get all Pokemon inside the current habitat.
    let results = await axios.get('//PokemonUrl');
    return res.json(results);
  } catch (error) {
    return next(error);
  }
});

// Trigger a wild pokemon encounter (returns a pokemon instance)
router.get('/:habitat/battle', async function(req, res, next) {
  try {
    // get the data for a specific pokemon and send it to the user
    let results = await axios.get('//PokemonUrl');
    return res.json(results);
  } catch (error) {
    return next(error);
  }
});
