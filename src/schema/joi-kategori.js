const Joi = require('joi');

const kategori=Joi.object({
      name:Joi.string().required(),
     
});

module.exports= kategori;