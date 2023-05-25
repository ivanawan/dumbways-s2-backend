
 const Sequelize = require("sequelize");
// console.log(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD,process.env.DB_HOST);
 const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
     host: process.env.DB_HOST,
     dialect: "mysql"
 });
 
 module.exports = sequelize;