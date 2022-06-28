const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db_connection");

const Chat = sequelize.define(
  "Chat",
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
  }
);

module.exports = Chat;