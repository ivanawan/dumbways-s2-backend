
const express = require('express')
const cors = require('cors');
// console.log(process.env);
const app = express();
const { createServer } = require("http");
const { Server } = require("socket.io");
const httpServer = createServer(app);
const bodyParser = require('body-parser')
const port = 5000
const io = new Server(httpServer, { cors: {origin: '*' } });
// import db from db connection
const sequelize=require('./src/config/db_connection');
// import model from folder model 
const {chat,Kategori,kategoriproduct,Product,Profile,User,transaction} = require('./src/models/index-model');
// import route
const authRoute = require('./src/routes/auth-router');
const kategoriRoute = require('./src/routes/kategori-router');
const productRoute = require('./src/routes/product-router');
const transactionRoute= require('./src/routes/transaction-router');




/**
 *    +++++++++++++++   socket io    +++++++++++++++
 */ 

require('./src/socket/index')(io)



/**
 *    +++++++++++++++   cors & header    +++++++++++++++
 */ 

app.use(cors());
app.use(function (req, res, next) {
  // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});



/**
 *    +++++++++++++++   body parser    +++++++++++++++
 */ 
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({ extended: true }));



/**
 *    +++++++++++++++   import route    +++++++++++++++
 */ 
app.use("/public", express.static(__dirname + "/public"));
httpServer.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
app.get('/', (req, res) =>{res.send('Hello this api dumbmerch v.1.00 !')});
app.use('/user',authRoute);
app.use('/category', kategoriRoute);
app.use('/product', productRoute);
app.use('/transaction',transactionRoute);




/**
 *    +++++++++++++++   db connection     +++++++++++++++
 */ 

const initApp = async () => {
    console.log("Testing the database connection..");
     try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
         /**
         * Syncronize the Post model.
         */
        // await sequelize.sync();
        // await transaction.sync({force:true});
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
};
/**
 * Initialize the application.
 */
initApp();







