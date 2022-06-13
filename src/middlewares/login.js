const joiuser= require('../schema/joi-user')

function login(){
    return async(req, res, next)=>{
    try {
        const value = joiuser.userLogin.validate(req.body);
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

module.exports=login;