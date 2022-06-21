const express = require('express');
const router = express.Router();
const isadmin = require('../middlewares/isadmin');
const joi = require('../middlewares/joi');
const transactionController = require("../Controllers/transactionController");

router.get('/',transactionController.getAll);

// router.get('/:id',isadmin(), transactionController.getOne);

router.post('/',isadmin(), joi("transaction"),transactionController.insert);

// router.put('/:id',isadmin(), joi("transaction"), transactionController.update);

// router.delete('/:id',isadmin(),transactionController.destroy);

module.exports=router;
