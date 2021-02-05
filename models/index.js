const Sequelize = require('sequelize');

const sequelize = new DataTypes('pokerscrum', 'postgres', 'postgres', {
  host: '127.0.0.1',
  dialect: 'postgres',
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.room = require('./room')(sequelize, Sequelize);
db.player = require('./player')(sequelize, Sequelize);

module.exports = db;
