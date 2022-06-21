const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db_connection");

const kategoriproduct = sequelize.define(
  "kategoriproduct",
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    idproduct:{
        type:DataTypes.INTEGER,
        allowNull:false  
      },
    idkategori:{
        type:DataTypes.INTEGER,
        allowNull:false  
      }  
  },
  {
    // Other model options go here
  }
);

module.exports = kategoriproduct;
