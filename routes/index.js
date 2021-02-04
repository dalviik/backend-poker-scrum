var express = require('express');
var app = express();

const models = require('../models');

const {
  Op
} = models.Sequelize;




app.get('/', (req, res, next) => {
  res.status(200).json({
    ok: true,
    mensaje: 'Mensaje de nuevo'
  })
});


module.exports = app;