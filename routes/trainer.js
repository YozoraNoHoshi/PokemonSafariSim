const express = require('express');
const router = new express.Router();
const Trainer = require('../models/trainer');
const jwt = require('jsonwebtoken');
// const env = require('../config');

// Shows all registered trainers.
router.get('/', async function(req, res, next) {
  try {
    let response = await Trainer.getAll();
    return res.json(response);
  } catch (error) {
    return next(error);
  }
});

// Registers a new trainer.
router.post('/', async function(req, res, next) {
  try {
    let { name } = req.body;
    let response = await Trainer.create({ name, startingMoney: 500 });
    return res.json(response);
  } catch (error) {
    return next(error);
  }
});

// Gets the details of a specific trainer. Shows their caught Pokemon, name, and money.
router.get('/:name', async function(req, res, next) {
  try {
    let response = await Trainer.getTrainer(req.params.name);
    // Needs to show inventory
    return res.json(response);
  } catch (error) {
    return next(error);
  }
});

// Displays that trainer's inventory
router.get('/:name/inventory', async function(req, res, next) {
  try {
    let trainer = await Trainer.getTrainer(req.params.name);
    return res.json(trainer.inventory);
  } catch (error) {
    return next(error);
  }
});

// Buy or Sells an item from the inventory
router.post('/:name/inventory', async function(req, res, next) {
  try {
    let trainer = await Trainer.getTrainer(req.params.name);
    let response = await trainer.modifyInventory(req.body);
    return res.json(response);
  } catch (error) {
    return next(error);
  }
});

// Edit's a trainer's details.
router.put('/:name', editTrainer);
router.patch('/:name', editTrainer);
async function editTrainer(req, res, next) {
  try {
    let { money } = req.body;

    let trainer = await Trainer.getTrainer(req.params.name);
    trainer.money = money;
    let response = await trainer.updateMoney();

    return res.json(response);
  } catch (error) {
    return next(error);
  }
}

// Deletes a trainer.
router.delete('/:name', async function(req, res, next) {
  try {
    let trainer = await Trainer.getTrainer(req.params.name);
    let response = await trainer.delete(req.params.name);
    return res.json(response);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
