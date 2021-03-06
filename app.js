const express = require('express');
const app = express();
const db = require('./db');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const pokeMartRoutes = require('./routes/pokemart');
const habitatRoutes = require('./routes/habitats');
const trainerRoutes = require('./routes/trainer');

app.use('/pokemart', pokeMartRoutes);
app.use('/trainer', trainerRoutes);
app.use('/habitat', habitatRoutes);

app.use(function(req, res, next) {
  let err = new Error('Page not found');
  err.status = 404;
  return next(err);
});
app.use(function(error, req, res, next) {
  let statusCode = error.status || 500;

  return res.status(statusCode).json({
    error: {
      message: error.message,
      status: statusCode
    }
  });
});
module.exports = app;
