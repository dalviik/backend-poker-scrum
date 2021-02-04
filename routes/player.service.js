var express = require('express');
var app = express();

const models = require('../models');
const { Op } = models.Sequelize;


// =================================================
// INGRESAR ROOM
// =================================================
app.post('/', async (req, res, next) => {
  console.log('\n=========***** INGRESAR ROOM *****=========');
  console.log(' ______________===> params:', req.body);

  const existRoom = await models.room.findOne({
    where: {
      idRoom: req.body.idRoom,
    },
  });

  if (!existRoom) {
    res.status(500).json({
      ok: false,
      errorMessage: 'No existe room con ese id',
    });
  }
  

  const player = await models.player.create({
    playerName: req.body.playerName,
    fcod_room: existRoom.idRoom
  })

  res.status(200).json({
    ok: true,
    existRoom,
    player
  });
});

// =================================================
// ACTUALIZAR PREGUNTA PLAYER
// =================================================
app.put('/:id', async (req, res, next) => {
  console.log('\n=========***** ACTUALIZAR PREGUNTA PLAYER *****=========');
  console.log(' ______________===> params ID:', req.params.id);
  console.log(' ______________===> params:', req.body);

  const bPlayer = await models.player.findOne({
    where: {
      idPlayer: req.params.id,
    },
  });

  if (bPlayer == null) {
    console.log('No existe Player con ese id');
    res.status(500).json({
      error: 'No existe Player con ese id',
    });
    return;
  }

  bPlayer.score = req.body.score;

  await bPlayer.save();

  console.log('\n\n\n\nSe ha actualizado la pregunta exitosamente');

  res.status(200).json({
    ok: true,
    bPlayer,
  });
});

module.exports = app;
