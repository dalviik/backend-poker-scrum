var express = require('express');
var app = express();

const models = require('../models');
const { Op } = models.Sequelize;


// =================================================
// Crear ROOM
// =================================================
app.post('/', async (req, res, next) => {
  console.log('\n=========***** CREAR ROOM *****=========');
  console.log(' ______________===> params:', req.body);

  const room = await models.room.create({});

  console.log('Se ha creado la sala exitosamente');

  res.status(200).json({
    room,
    ok: true,
  });
});


// =================================================
// LISTAR PLAYERS ROOM
// =================================================
app.get('/:id', async (req, res, next) => {
  console.log('\n=========***** OBTENER PLAYER DE ROOM *****=========');
  console.log('El id es obt :', req.params.id);

  const existRoom = await models.room.findOne({
    where: {
      idRoom: req.params.id,
    },
  });

  if (existRoom) {
    const players = await models.player.findAll({
      where: {
        fcod_room: existRoom.idRoom,
      },
    });

    res.status(200).json({
      ...existRoom.dataValues,
      players:players
    });
    return;
  } else {
    res.status(500).json({
      ok: false,
      errorMessage: 'No existe room con ese id',
    });
  }
});


// =================================================
// ACTUALIZAR PREGUNTA ROOM
// =================================================
app.put('/:id', async (req, res, next) => {
  console.log('\n=========***** ACTUALIZAR PREGUNTA ROOM *****=========');
  console.log(' ______________===> params ID:', req.params.id);
  console.log(' ______________===> params:', req.body);

  const bRoom = await models.room.findOne({
    where: {
      idRoom: req.params.id,
    },
  });

  if (bRoom == null) {
    console.log('No existe ROOM con ese codigo');
    res.status(500).json({
      error: 'No existe ROOM con ese codigo',
    });
    return;
  }

  bRoom.question = req.body.question;

  await bRoom.save();

  console.log('\n\n\n\nSe ha actualizado la pregunta exitosamente');

  res.status(200).json({
    ok: true,
    bRoom,
  });
});


module.exports = app;
