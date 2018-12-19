const express = require('express');
const router = new express.Router();
const { PokeMart, PokeBall, BattleItem } = require('../models/user');
const jwt = require('jsonwebtoken');
const env = require('../config');

router.get('/', async function(req, res, next) {
  try {
    let response = await PokeMart.getItems();
    return res.json(response.body);
  } catch (error) {
    return next(error);
  }
});
router.get('/:itemName', async function(req, res, next) {
  try {
    let response = await PokeMart.getItem(req.params.itemName);
    return res.json(response.body);
  } catch (error) {
    return next(error);
  }
});
