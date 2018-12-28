const express = require('express');
const router = new express.Router();
// const jwt = require('jsonwebtoken');
// const env = require('../config');

// Shows all habitats available
router.get('/', async function(req, res, next) {
  try {
    return res.json('bleh');
  } catch (error) {
    return next(error);
  }
});

// Shows the pokemon that can be battled within a habitat
router.get('/:habitat', async function(req, res, next) {
  try {
    return res.json('bleh');
  } catch (error) {
    return next(error);
  }
});

// Trigger a wild pokemon encounter (returns a pokemon instance)
router.get('/:habitat/battle', async function(req, res, next) {
  try {
    return res.json('bleh');
  } catch (error) {
    return next(error);
  }
});
