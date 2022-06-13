const Joi = require('joi');

const userRegister=Joi.object({
    name: Joi.string()
    .min(4)
    .max(30)
    .required(),
    email:Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).lowercase().required(),
     password: Joi.string().min(8).required(),

});

const userLogin=Joi.object({
    email:Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).lowercase().required(),
     password: Joi.string().min(8).required(),
});


module.exports={userRegister, userLogin};