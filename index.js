const express = require('express')
const app = express();
const cors = require('cors');
const port = 5000
const bodyParser = require('body-parser')
// import db from db connection
const sequelize=require('./src/config/db_connection');
// import model from folder model 
const Kategori = require('./src/models/Kategori');
const Product = require('./src/models/product');
const User = require('./src/models/User');
// import route
const authRoute = require('./src/routes/auth-router');

app.use(cors());
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
//body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
//+++++++++++route app++++++++++
app.get('/', (req, res) => {
  res.send('Hello this api dumbmerch v.1.00 !')
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
app.use('/user',authRoute);

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





