const express = require('express');
const router = express.Router();
const userController= require('../Controllers/userController');

router.post('/login', userController.login);
  
/* POST programming language */
router.post('/register', userController.register);

/* PUT programming language */
// router.put('/:id', userController.update);

/* DELETE programming language */
// router.delete('/:id', userController.destroy);

module.exports=router;
