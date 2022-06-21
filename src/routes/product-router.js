const express = require('express');
const router = express.Router();
const productController=require('../Controllers/productController');
const isadmin =require('../middlewares/isadmin');
const joi = require('../middlewares/joi');
const { uploadFile } =  require('../middlewares/upload')

router.get('/',isadmin(),productController.getAll);                 //======== get all product
router.get('/deleted',isadmin(),productController.getDeleted);      //======== get all deleted product
router.put('/restore/:id',isadmin(),productController.restore);     //======== restore deleted product by id
router.delete('/deleted/:id',isadmin(),productController.destroyDeletedData);  //======== delete data force by id
router.get('/:id',isadmin(), productController.getOne);            //======== get one product by id
router.put('/:id', uploadFile('image'),isadmin(),joi("productUpdate"),productController.update); //======== update product
router.post('/', uploadFile('image'),isadmin(),joi("product"),productController.insert);       //======== create product
router.delete('/:id',isadmin(),productController.destroy);          //========delete product


module.exports=router;