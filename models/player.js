module.exports = (sequelize, DataTypes) => {
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


  return Player;
};