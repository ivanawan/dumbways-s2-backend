const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db_connection");

const Kategori = sequelize.define(
  "kategori",
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // Other model options go here
  }
);

module.exports = Kategori;
