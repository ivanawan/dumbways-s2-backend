const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController');
const joi = require('../middlewares/joi');
const auth = require('../middlewares/auth');
const { uploadFile } =  require('../middlewares/upload')

router.post('/login',joi("login"), userController.login);

router.post('/register',joi("register"), userController.register);

router.put('/update',auth() , joi("register"),userController.update); // tidak menggunakan id karena user hanya bisa merubah datanya sendiri 

router.post('/profil',uploadFile('image'),auth(),joi("profil"),userController.insertProfil);

router.get('/profil',auth(), userController.getProfile);

router.delete('/',auth(),userController.destroy);

module.exports=router;
