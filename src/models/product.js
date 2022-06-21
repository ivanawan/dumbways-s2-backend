const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db_connection");

const Product = sequelize.define(
  "Product", 
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    iduser:{
     type:DataTypes.INTEGER
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    desc: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    qty: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    terjual: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    paranoid: true,
  }
);

module.exports = Product;
