const Joi = require('joi');
const joiusaer = require('../schema/joi-user');
 function register(){

   return async(req, res, next)=>{
        try {
            const value = joiusaer.userRegister.validate(req.body);
            if(!value.error){
                next()
            }else{ 
                return res.json({
                    status: 'error',
                    message: value.error.details[0].message
                });
            }
        }catch(err){
            console.log(err);
        }
    }
}

module.exports = register;