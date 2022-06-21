const Joi = require('joi');


const transaction=Joi.object({
      idProduct:Joi.number().required(),
      idSeller:Joi.number().required(),
      price:Joi.number().required()
});

module.exports= transaction;