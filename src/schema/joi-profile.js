const Joi = require('joi');

const profil = Joi.object({
  image: Joi.string(),
  phone: Joi.number().required(),
  gender: Joi.string().required(),
  address: Joi.string().required(),
});

module.exports= profil;