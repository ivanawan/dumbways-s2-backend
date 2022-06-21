const express = require('express');
const router = express.Router();
const isadmin = require('../middlewares/isadmin');
const joi = require('../middlewares/joi');
const kategoriController = require("../Controllers/kategoriController");


router.get('/',isadmin(),kategoriController.getAll);                      //========   get all data kategori     
router.get('/:id',isadmin(), kategoriController.getOne);                  //========   get one data kategori by id   
router.post('/',isadmin(), joi("kategori"),kategoriController.insert);    //========   create data to kategori   
router.put('/:id',isadmin(), joi("kategori"), kategoriController.update); //========   edit data kategori by  id
router.delete('/:id',isadmin(),kategoriController.destroy);               //========   delete data kategori by id  

module.exports=router;
