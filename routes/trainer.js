const express = require('express');
const router = new express.Router();
const Trainer = require('../models/trainer');
const jwt = require('jsonwebtoken');
// const env = require('../config');

// Shows all registered trainers.
router.get('/', async function(req, res, next) {
  try {
    let response = await Trainer.all();
    return res.json(response);
  } catch (error) {
    return next(error);
  }
});

// Registers a new trainer.
router.post('/', async function(req, res, next) {
  try {
    let { name } = req.body;
    let response = await Trainer.create(name);
    return res.json(response);
  } catch (error) {
    return next(error);
  }
});

// Gets the details of a specific trainer. Shows their caught Pokemon, name, and money.
router.get('/:id', async function(req, res, next) {
  try {
    let response = await Trainer.getById(req.params.id);
    return res.json(response);
  } catch (error) {
    return next(error);
  }
});

// Adds an item to the trainer's inventory. Must have enough money to make the purchase.
router.post('/:id/buy', async function(req, res, next) {
  try {
    let trainer = await Trainer.getById(req.params.id);
    let { item, quantity } = req.body;
    let response = await trainer.buyItem(item, quantity);
    return res.json(response);
  } catch (error) {
    return next(error);
  }
});

// Sells an item from the trainer's inventory.
router.post('/:id/sell', async function(req, res, next) {
  try {
    let trainer = await Trainer.getById(req.params.id);
    let { item, quantity } = req.body;
    let response = await trainer.sellItem(item, quantity);
    return res.json(response);
  } catch (error) {
    return next(error);
  }
});

// Edit's a trainer's details.
router.put('/:id', async function(req, res, next) {
  try {
    let { name, money } = req.body;

    let trainer = await Trainer.getById(req.params.id);
    if (!name) name = trainer.name;
    if (!money) money = trainer.money;
    let response = await trainer.update(name, money);

    return res.json(response);
  } catch (error) {
    return next(error);
  }
});

// Deletes a trainer.
router.delete('/:id', async function(req, res, next) {
  try {
    let response = await Trainer.delete(req.params.id);
    return res.json(response);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
