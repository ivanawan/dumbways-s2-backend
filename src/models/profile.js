const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db_connection");
const User = require("./User");

const Profile = sequelize.define(
  "Profile",
  {id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    }, 
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
    type: DataTypes.TEXT,
      allowNull: false,
    },
    iduser:{
      type:DataTypes.INTEGER,
      allowNull:false  
    }
  },{});

  // Profile.belongsTo(User,{targetKey:'id',foreignKey: 'iduser' });
  module.exports=Profile;