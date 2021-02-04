const DataTypes = require('sequelize');

const sequelize = new DataTypes('pokerscrum', 'postgres', 'postgres', {
  host: '127.0.0.1',
  dialect: 'postgres',
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Conectado');
  })
  .catch((err) => {
    console.log('Error conexion');
  });

// =================================================
// ROOM
// =================================================
const Room = sequelize.define(
  'Room',
  {
    idRoom: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    question: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    timestamps: false,
    tableName: 'room',
  }
);

// =================================================
// PLAYER
// =================================================
const Player = sequelize.define('Player', {
  idPlayer: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  playerName: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  score: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  
  fcod_room: {
    type: DataTypes.INTEGER,
    references: {
      model: 'room',
      key: 'idRoom',
    }
  }
}, {
  timestamps: false,
  tableName: 'player',
});

sequelize
  .sync({
    logging: console.log,
    force: true,
  })
  .then(() => {
    console.log('\n\nSync finish!');
  })
  .catch((err) => {
    console.log('Unable to sync');
  });

module.exports = sequelize;
