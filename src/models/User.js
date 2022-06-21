const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db_connection");
const Product = require("./product");
const Profile = require("./profile");
const transaction = require("./Transaction");


const User = sequelize.define(
  "User",
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "MEMBER",
    }
  },
  {
    // Other model options go here
  }
);


module.exports=User; 