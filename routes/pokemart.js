const express = require('express');
const router = new express.Router();
const { PokeMart, PokeBall, BattleItem } = require('../models/items');
// const jwt = require('jsonwebtoken');
// const env = require('../config');

// Shows all the items in the PokeMart. Also restocks the Pokemart if it's out of date.
// PokeMart stock is the database.
router.get('/', async function(req, res, next) {
  try {
    let response = await PokeMart.getItems();
    return res.json(response);
  } catch (error) {
    return next(error);
  }
});

// Gets the details of a specific item in the PokeMart.
// Buy/Sell is handled in the trainer route.
router.get('/:itemName', async function(req, res, next) {
  try {
    let response = await PokeMart.getItem(req.params.itemName);
    return res.json(response);
  } catch (error) {
    return next(error);
  }
});

// Removes an item from the PokeMart.
router.delete('/:itemName', async function(req, res, next) {
  try {
    let response = await PokeMart.deleteItem(req.params.itemName);
    return res.json(response);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
