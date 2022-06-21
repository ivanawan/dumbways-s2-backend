const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db_connection");

const chat = sequelize.define(
  "chat",
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    idsender:{
        type:DataTypes.INTEGER,
        allowNull:false  
    },
    idreceiver:{
        type:DataTypes.INTEGER,
        allowNull:false  
      },
    chat: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // Other model options go here
  }
);

module.exports = chat;