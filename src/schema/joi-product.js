const Joi = require('joi');

const product=Joi.object({
      iduser:Joi.number(),
      title:Joi.string().required(),
      image:Joi.string(),
      desc:Joi.string().required(),
      qty:Joi.number().required(),
      price:Joi.number().required(),
      rating:Joi.number(),
      terjual:Joi.number(),
});

const productUpdate=Joi.object({
      iduser:Joi.number(),
      title:Joi.string(),
      image:Joi.string(),
      desc:Joi.string(),
      qty:Joi.number(),
      price:Joi.number(),
      rating:Joi.number(),
      terjual:Joi.number(),
});

module.exports= {product,productUpdate};