const Sequelize = require('sequelize');

const sequelize = new Sequelize('pokerscrum', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres',
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.room = require('./room')(sequelize, Sequelize);
db.player = require('./player')(sequelize, Sequelize);

module.exports = db;
