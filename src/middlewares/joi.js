const product=require('../schema/joi-product');
const kategori=require('../schema/joi-kategori');
const auth= require('../schema/joi-user');
const transaction = require('../schema/joi-transaction');

const joiShema={
                 product: product.product,
                 productUpdate:product.productUpdate,
                 kategori:kategori,
                 login:auth.userLogin,
                 register:auth.userRegister,
                 transaction:transaction
               };


function joi(schema){
// console.log(joi);
    return async(req, res, next)=>{
        if(schema in joiShema === false)  return res.json({status: 'error', message: ` schema "${schema}" not found` });
         try {
             const value = joiShema[schema].validate(req.body);
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

module.exports = joi;