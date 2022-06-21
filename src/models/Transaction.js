const { DataTypes } = require("sequelize");
const sequelize = require("../config/db_connection");
const Product = require("./product");
const User = require("./User");

const Transaction = sequelize.define(
  "Transaction",
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    idProduct: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }, 
    idBuyer: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    idSeller: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
     price:{
        type:DataTypes.INTEGER,
        allowNull:false
     },

    status:{
        type:DataTypes.STRING,
        allowNull:false
    }

  },
  {
    // Other model options go here
  }
);


// transaction.belongsTo(User);

module.exports = Transaction;
