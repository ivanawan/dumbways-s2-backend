const User = require("../models/User");
const jwt =require('jsonwebtoken');

async function login(req,res,next){
    res.send('user get all');
}

async function register(req,res,next){
    const token =generateToken();
    console.log(token);
    res.send('user:'+{token});
}

async function update(req,res,next){
    res.send('user update');

}


async function destroy(req,res,next){
    res.send('user getDestroy');
}

function generateToken(){
    const data={
     id:17,
     name:"ivan setiawan"
    }
 return jwt.sign(data,"86eb7ad1792dc09c02626f6b9ec543c15e3bd7b345152769de955793321510fed36078e83749604b8b5a7164296a80d90506ea189ff54b336827a76eb7a8b801",{ expiresIn: '1800s' });
}

module.exports={login,register,update,destroy};