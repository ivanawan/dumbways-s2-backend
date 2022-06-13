const express = require('express');
const router = express.Router();
const userController= require('../Controllers/userController');
const register = require('../middlewares/register');
const login =require('../middlewares/login');
const auth = require('../middlewares/auth');

router.post('/login',login(), userController.login);
  
/* POST programming language */
router.post('/register',register(), userController.register);

router.get('/test',auth(),(req,res)=>{
    console.log(req.user);
    res.status(200).json('hooo');
});

/* PUT programming language */
// router.put('/:id', userController.update);

/* DELETE programming language */
// router.delete('/:id', userController.destroy);

module.exports=router;
