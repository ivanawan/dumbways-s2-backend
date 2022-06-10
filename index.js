const express = require('express')
const app = express();
const port = 5000
// import db from db connection
const sequelize=require('./src/config/db_connection');
// import model from folder model 
const Kategori = require('./src/models/Kategori');
const Product = require('./src/models/product');
const User = require('./src/models/User');
// import route
const authRoute = require('./src/routes/auth-router');

app.get('/', (req, res) => {
  res.send('Hello this api dumbmerch v.1.00 !')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// ++++++++++++++++++++++++++++++++++++++++++++++db conection+++++++++++++++++++++++++++ 
const initApp = async () => {
    console.log("Testing the database connection..");
     try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
         /**
         * Syncronize the Post model.
         */
        User.sync();
        Kategori.sync();
        Product.sync();
        
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
};
/**
 * Initialize the application.
 */
initApp();

// ++++++++++++++++++++++++++++++++++++++++++++++end db conection+++++++++++++++++++++++++++ 

// +++++++++++++++++++++++++++++++++++++++++++++import route+++++++++++++++++++++++++++++++

app.use('/user',authRoute);

