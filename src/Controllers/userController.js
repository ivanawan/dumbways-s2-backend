const User = require("../models/User");
const bcrypt= require('bcrypt');
const jwt =require('jsonwebtoken');

/*
**function ini digunakan untuk login
**dengan field email dan password
 */
async function login(req,res,next){
    console.log('login here');
   const body = req.body;
   console.log(body);
   const rslt = await User.findOne({where:{email:body.email}});
   if(!rslt) return res.json({status:"failed",message:" email not found"});
   
   console.log(rslt);

   if(bcrypt.compareSync(body.password, rslt.password) === true){
    return res.json({
        status: 'success',
        message: "login berhasil",
        data:{id:rslt.id,
            name:rslt.name,
            email:rslt.email,
            role:rslt.role,
            phone:rslt.phone,
            image:rslt.image,
            gender:rslt.gender,
            address:rslt.address,
            token:generateToken({
                id:rslt.id,
                role:rslt.role,
                name:rslt.name,
                email:rslt.email
            })}
    });
   }else{
    return res.json({status:"failed",message:"Password not match"});
   }
   

}
/*
**function ini digunakan untuk register
**dengan field name,email dan password
 */
async function register(req,res,next){
    const body =req.body;
    
    const rslt = await User.create({
        name:body.name,
        email:body.email,
        password:bcrypt.hashSync(body.password,12),
    });
    console.log(rslt.toJSON());
  
    return res.json({
        status: 'success',
        message: "register berhasil",
        data:{id:rslt.id,
            name:rslt.name,
            email:rslt.email,
            role:rslt.role,
            phone:rslt.phone,
            image:rslt.image,
            gender:rslt.gender,
            address:rslt.address,
            token:generateToken({
                id:rslt.id,
                role:rslt.role,
                name:rslt.name,
                email:rslt.email
            })}
    });
}


async function update(req,res,next){
    res.send('user update');

}


async function destroy(req,res,next){
    res.send('user getDestroy');
}

function generateToken(data){
 return jwt.sign(data,"86eb7ad1792dc09c02626f6b9ec543c15e3bd7b345152769de955793321510fed36078e83749604b8b5a7164296a80d90506ea189ff54b336827a76eb7a8b801",{ expiresIn: '1800s' });
}

module.exports={login,register,update,destroy};