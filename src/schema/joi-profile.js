const Joi = require('joi');

const profil=Joi.object({
      phone:Joi.number().required(),
      gender:Joi.string().required(),
      address:Joi.string().required()
});

module.exports= profil;