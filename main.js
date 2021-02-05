const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const https = require('https');
const path = require('path');
const fs = require('fs');

// initializations
const app = express();

// settings
// app.set('port', process.env.PORT || 3000);

// settings prod
app.set('port', process.env.PORT || 3003);

// middlewares
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  next();
});

// Importar Rutas
var roomRoutes = require('./routes/room.service');
var playerRoutes = require('./routes/player.service');

var appRoutes = require('./routes/index');

// Rutas
app.use('/room', roomRoutes);
app.use('/player', playerRoutes);
app.use('/', appRoutes);


/*
const sslServer = https.createServer(
  {
    key: fs.readFileSync(path.join(__dirname, 'cert', 'privkey.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'cert', 'fullchain.pem')),
  },
  app
);


sslServer.listen(app.get('port'), () => {
  console.log(
    ` ===== ${new Date()}\n\n ***** POKER FACE SECURE SERVER LEVANTADO EN EL PUERTO ${app.get(
      'port'
    )}`
  );
  console.log(`
  (\\__/)  . .~ ~ ~. ))
  /0 0  ./      .'
 {'_'__,   \\    {
   / .  . )    \\
   |-| '-' \\    }
  .(   _(   )_.'
 '---.~_ _ _&
  `);
}); */


 
app.listen(app.get('port'), () => {
  console.log(
    ` ===== ${new Date()}\n\n POKERSCRUM SERVER LEVANTADO EN EL PUERTO ${app.get('port')}`
  );
  console.log(`
  (\\__/)  . .~ ~ ~. ))
  /- -  ./      .'
 {'_'__,   \\    {
   / .  . )    \\
   |-| '-' \\    }
  .(   _(   )_.'
 '---.~_ _ _&
  `);
});
 