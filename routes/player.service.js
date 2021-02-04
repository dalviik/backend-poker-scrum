var express = require('express');
var app = express();

const models = require('../models');
const { Op } = models.Sequelize;

// =================================================
// Busqueda GRUPO en base a MODALIDAD
// =================================================
app.get('/modalidad', async (req, res, next) => {
  console.log('\n=========***** BUSQUEDA EN BASE A MODALIDAD *****=========');
  console.log('El termino es:', req.query.modalidad);

  let modalidad = req.query.modalidad;

  const grupos = await models.grupo.findAll({
    where: {
      fcod_modalidad: modalidad,
    },

    order: [
      ['fcod_modalidad', 'ASC'],
      ['idGrupo', 'ASC'],
    ],
  });

  res.status(200).json({
    ok: true,
    message: 'Grupos encontrados',
    count: grupos.length,
    rows: grupos,
  });
});

// =================================================
// Busqueda en base a termino
// =================================================
app.get('/busqueda', async (req, res, next) => {
  console.log('\n=========***** BUSQUEDA EN BASE A TERMINO *****=========');
  console.log('El termino es:', req.query.termino);
  let termino = req.query.termino;

  const grupos = await models.grupo.findAll({
    where: {
      [Op.or]: [
        {
          codigoGrupo: {
            [Op.iLike]: termino + '%',
          },
        },
        {
          nombreGrupo: {
            [Op.iLike]: termino + '%',
          },
        },
        {
          fcod_modalidad: {
            [Op.iLike]: termino + '%',
          },
        },
        {
          jefeGrupo: {
            [Op.iLike]: termino + '%',
          },
        },
      ],
      [Op.not]: [
        {
          estadoGrupo: 'ELIMINADO',
        },
      ],
    },
    order: [
      ['fcod_modalidad', 'ASC'],
      ['idGrupo', 'ASC'],
    ],
  });

  res.status(200).json({
    ok: true,
    message: 'Grupos encontrados',
    count: grupos.length,
    rows: grupos,
  });
});

// =================================================
// LISTAR GRUPOS
// =================================================
app.get('/', async (req, res, next) => {
  let grupos = [];

  await models.grupo
    .findAll({
      order: [
        ['fcod_modalidad', 'asc'],
        ['nroGrupo', 'asc'],
      ],
    })
    .then((resp) => {
      console.log(resp);
      grupos = resp;
    })
    .catch((err) => {});

  res.status(200).json({
    ok: true,
    mensaje: 'listado grupos',
    count: grupos.length,
    rows: grupos,
  });
});

// =================================================
// OBTENER UN GRUPO POR CODIGO GRUPO
// =================================================
app.get('/:id', async (req, res, next) => {
  console.log('\n=========***** OBTENER UN GRUPO *****=========');

  console.log('El id es obt :', req.params.id);

  bGrupo = {};

  await models.grupo
    .findOne({
      where: {
        idGrupo: parseInt(req.params.id),
      },
      order: [['nroGrupo', 'ASC']],
    })
    .then((resp) => {
      if (resp) {
        res.status(200).json(resp);
      } else {
        res.status(500).json(resp);
      }
    })
    .catch((err) => {
      console.log('err');
    });
});

// =================================================
// CREAR GRUPO
// =================================================
app.post('/', async (req, res, next) => {
  console.log('\n=========***** crearGrupo *****=========');
  console.log(' ______________===> params:', req.body);

  const fechaActual = new Date();

  const existeGrupo = await models.grupo.findOne({
    where: {
      codigoGrupo: req.body.fcod_modalidad + '-G' + req.body.nroGrupo,
    },
  });

  if (existeGrupo != null) {
    console.log('Ya existe grupo con ese codigo');
    res.status(500).json({
      errorMessage: 'Ya existe grupo con ese Nro.',
    });
    return;
  }

  console.log('Creando nuevo modelo grupo');
  try {
    const grupo = await models.grupo.create({
      codigoGrupo: req.body.fcod_modalidad + '-G' + req.body.nroGrupo,
      nroGrupo: req.body.nroGrupo,
      nombreGrupo: ('' + req.body.nombreGrupo).toUpperCase(),
      fechaFundacionGrupo: req.body.fechaFundacionGrupo,
      logoGrupo: req.body.logoGrupo,
      imagenRepresentativa: req.body.imagenRepresentativa,
      jefeGrupo: req.body.jefeGrupo,
      subJefeGrupo: req.body.subJefeGrupo,
      strioHacienda: req.body.strioHacienda,
      strioDeportes: req.body.strioDeportes,
      strioActas: req.body.strioActas,
      inspector1: req.body.inspector1,
      inspector2: req.body.inspector2,
      inspector3: req.body.inspector3,
      inspector4: req.body.inspector4,
      gestion: req.body.gestion,
      _fecha_creacion: fechaActual,
      fcod_modalidad: req.body.fcod_modalidad,
    });

    res.status(200).json(grupo);
  } catch (error) {
    console.log('El error es');
    console.log(error);
    res.status(500).json({
      ok: false,
      errorMessage: 'Error en la creacion del grupo',
    });
  }
});

// =================================================
// Actualizar Grupo
// =================================================
app.put('/:id', async (req, res, next) => {
  console.log('\n=========***** ACTUALIZAR GRUPO *****=========');
  console.log(' ______________===> params ID:', req.params.id);
  console.log(' ______________===> params:', req.body);

  const fechaActual = new Date();

  const bGrupo = await models.grupo.findOne({
    where: {
      codigoGrupo: req.params.id,
    },
  });

  if (bGrupo == null) {
    console.log('No existe grupo con ese codigo');
    res.status(500).json({
      error: 'No existe grupo con ese codigo',
    });
    return;
  }

  bGrupo.codigoGrupo = req.body.fcod_modalidad + '-G' + req.body.nroGrupo;
  bGrupo.nombreGrupo = req.body.nombreGrupo;
  bGrupo.nroGrupo = req.body.nroGrupo;
  bGrupo.fechaFundacionGrupo = req.body.fechaFundacionGrupo;
  bGrupo.logoGrupo = req.body.logoGrupo;
  bGrupo.imagenRepresentativa = req.body.imagenRepresentativa;
  bGrupo.jefeGrupo = req.body.jefeGrupo;
  bGrupo.subJefeGrupo = req.body.subJefeGrupo;
  bGrupo.strioHacienda = req.body.strioHacienda;
  bGrupo.strioDeportes = req.body.strioDeportes;
  bGrupo.strioActas = req.body.strioActas;
  bGrupo.inspector1 = req.body.inspector1;
  bGrupo.inspector2 = req.body.inspector2;
  bGrupo.inspector3 = req.body.inspector3;
  bGrupo.inspector4 = req.body.inspector4;
  bGrupo.fcod_modalidad = req.body.fcod_modalidad;
  bGrupo._fecha_modificacion = fechaActual;

  bGrupo.save();

  console.log('\n\n\n\nSe ha actualizado el grupo exitosamente');

  res.status(200).json({
    ok: true,
    bGrupo,
  });
});

// =================================================
// Eliminar grupo
// =================================================
app.delete('/:id', async (req, res, next) => {
  console.log('\n=========***** ELIMINAR GRUPO *****=========');
  console.log('El id es de :', req.params.id);

  await models.grupo
    .destroy({
      where: {
        codigoGrupo: req.params.id,
      },
    })
    .then((resp) => {
      console.log('Grupo eliminado correctamente');
      res.status(200).json({
        ok: true,
        message: 'Se ha eliminado el grupo correctamente',
      });
    })
    .catch((err) => {
      console.log('err');
      res.status(500).json({
        ok: false,
        errorMessage: 'Error al eliminar grupo',
      });
    });
});

module.exports = app;
