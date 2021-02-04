const DataTypes = require('sequelize');

module.exports = (sequelize, DataTypes) => {
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

  return Room;
};
