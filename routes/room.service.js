var express = require('express');
var app = express();

const models = require('../models');
const { Op } = models.Sequelize;

// =================================================
// Listar player
// =================================================
app.get('/', async (req, res, next) => {
  let players = [];
  console.log('\n=========***** LISTAR MODALIDADES *****=========');

  await models.room
    .findAll({
      order: [['idModalidad', 'ASC']],
    })
    .then((resp) => {
      console.log(resp);
      modalidades = resp;
    })
    .catch((err) => {
      console.log('Error al listar modalidades');
    });

  res.status(200).json({
    ok: true,
    mensaje: 'Mensaje de listar modalidades',
    count: modalidades.length,
    rows: modalidades,
  });
});

// =================================================
// Listar MODALIDADES y LINEAS
// =================================================
app.get('/lineas', async (req, res, next) => {
  console.log(
    '\n=========***** LISTAR MODALIDADES CON LINEAS - MAP VERSION*****========='
  );
  let arrayModalidades = [];

  const modalidades = await models.modalidad.findAll({
    where: {},
    order: [
      ['sectorModalidad', 'ASC'],
      ['idModalidad', 'ASC'],
      ['_fecha_creacion', 'ASC'],
    ],
  });

  if (modalidades.length > 0) {
    for (let modalid of modalidades) {
      console.log(modalid.nombreModalidad);
      const lineas = await models.linea.findAll({
        where: {
          fcod_modalidad: modalid.nombreModalidad,
        },
        order: [
          ['idLinea', 'ASC'],
          ['_fecha_creacion', 'ASC'],
        ],
      });
      if (lineas.length > 0) {
        arrayModalidades.push({
          idModalidad: modalid.idModalidad,
          nombreModalidad: modalid.nombreModalidad,
          lineas: lineas,
        });
      } else {
        arrayModalidades.push({
          idModalidad: modalid.idModalidad,
          nombreModalidad: modalid.nombreModalidad,
          lineas: [],
        });
      }
    }

    console.log('ARRAY MODADLIDADES');
    console.log(arrayModalidades);
    res.status(200).json({
      ok: true,
      message: 'HAY MODALIDADES',
      count: modalidades.length,
      rows: arrayModalidades,
    });
  } else {
    res.status(500).json({
      message: 'NO HAY MODALIDADES',
    });
  }
});

// =================================================
// Listar MODALIDADES y GRUPOS
// =================================================
app.get('/grupos', async (req, res, next) => {
  let arrayModalidades = [];
  let arrayGrupos = [];
  console.log('\n=========***** LISTAR MODALIDADES CON GRUPOS*****=========');

  const modalidades = await models.modalidad.findAll({
    order: [['idModalidad', 'ASC']],
  });

  if (modalidades.length > 0) {
    for (let modadlidad of modalidades) {
      const grupos = await models.grupo.findAll({
        where: {
          fcod_modalidad: modadlidad.nombreModalidad,
        },
      });

      if (grupos.length > 0) {
        arrayModalidades.push({
          nombreModalidad: modadlidad.nombreModalidad,
          grupos: grupos,
        });
      }
    }
    res.status(200).json({
      ok: true,
      mensaje: 'Mensaje de nuevo modalidades',
      count: modalidades.length,
      rows: arrayModalidades,
    });
  }
});




// =================================================
// OBTENER UNA MODALIDAD
// =================================================
app.get('/:id', async (req, res, next) => {
  console.log('\n=========***** OBTENER UNA MODALIDAD *****=========');

  console.log('El id es obt :', req.params.id);
  const existeModalidad = await models.modalidad.findOne({
    where: {
      nombreModalidad: req.params.id,
    },
  });

  if (existeModalidad) {
    res.status(200).json(existeModalidad);
    return;
  } else {
    res.status(500).json({
      ok: false,
      errorMessage: 'No existe modalidad con ese nombre',
    });
  }
});

// =================================================
// Crear MODALIDAD
// =================================================
app.post('/', async (req, res, next) => {
  console.log('\n=========***** CREAR MODALIDAD *****=========');
  console.log(' ______________===> params:', req.body);

  const fechaActual = new Date();

  const existeSector = await models.modalidad.findOne({
    where: {
      nombreModalidad: ('' + req.body.nombreModalidad).toUpperCase(),
    },
  });

  if (existeSector != null) {
    console.log('Ya existe modalidad we con ese codigo');
    res.status(500).json({
      errorMessage: 'Ya existe modalidad con ese nombre',
    });
    return;
  }

  const modadalidad = await models.modalidad.create({
    nombreModalidad: (req.body.nombreModalidad + '').toUpperCase(),
    sectorModalidad: req.body.sectorModalidad,
    imagenModalidad: req.body.imagenModalidad,
    _fecha_creacion: fechaActual,
  });

  console.log('Se ha creado el modalidad exitosamente');

  res.status(200).json({
    ok: true,
  });
});

// =================================================
// ACTUALIZAR MODALIDAD
// =================================================
app.put('/:id', async (req, res, next) => {
  console.log('\n=========***** ACTUALIZAR GRUPO *****=========');
  console.log(' ______________===> params ID:', req.params.id);
  console.log(' ______________===> params:', req.body);

  const fechaActual = new Date();

  const bModalidad = await models.modalidad.findOne({
    where: {
      nombreModalidad: req.params.id,
    },
  });

  if (bModalidad == null) {
    console.log('No existe modalidad con ese codigo');
    res.status(500).json({
      error: 'No existe modalidad con ese codigo',
    });
    return;
  }

  bModalidad.sectorModalidad = req.body.sectorModalidad;
  bModalidad.imagenModalidad = req.body.imagenModalidad;

  await bModalidad.save();

  console.log('\n\n\n\nSe ha actualizado la modalidad exitosamente');

  res.status(200).json({
    ok: true,
    bModalidad,
  });
});

// =================================================
// Eliminar MODALIDAD
// =================================================

app.delete('/:id', async (req, res, next) => {
  console.log('\n=========***** ELIMINAR MODALIDAD *****=========');
  console.log('El id es de :', req.params.id);

  await models.modalidad
    .destroy({
      where: {
        nombreModalidad: req.params.id,
      },
    })
    .then((resp) => {
      console.log('MODALIDAD eliminado correctamente');
    })
    .catch((err) => {
      console.log('err');
      res.status(500).json({
        ok: false,
        errorMessage:
          'No se ha podido eliminar el modalidad\n Verifique que no tenga grupos que dependan de este modalidad',
      });
    });

  res.status(200).json({
    ok: true,
    message: 'Se ha eliminado la modalidad correctamente',
  });
});

module.exports = app;
