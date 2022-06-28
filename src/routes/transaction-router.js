const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const joi = require('../middlewares/joi');
const transactionController = require("../Controllers/transactionController");

router.get('/',auth(),transactionController.getAll);

// router.get('/:id',isadmin(), transactionController.getOne);

router.post('/', auth(),joi("transaction"),transactionController.insert);

router.post('/notification', transactionController.notification);

// router.delete('/:id',isadmin(),transactionController.destroy);

module.exports=router;
