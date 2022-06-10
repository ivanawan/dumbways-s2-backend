const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db_connection");

const Kategori = sequelize.define(
  "Kategori",
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    kategori: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // Other model options go here
  }
);

module.exports = Kategori;
