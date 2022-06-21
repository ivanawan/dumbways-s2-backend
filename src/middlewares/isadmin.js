const jwt= require('jsonwebtoken');

function isadmin(){
 return (req, res, next)=>{
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    
    if (token == null) return res.json({status:"error",message:"error token  not exist"})
    
    jwt.verify(token,"86eb7ad1792dc09c02626f6b9ec543c15e3bd7b345152769de955793321510fed36078e83749604b8b5a7164296a80d90506ea189ff54b336827a76eb7a8b801", (err, user) => {
      console.log(err)
  
      if (err) return res.json({status:"error",message:"error on token"})
      // console.log(user);
      if(user.status !== "ADMIN") return res.json({status:"error",message:" your not admin"})

      req.user = user
      
      next()
    })
  }
}
  
  module.exports=isadmin;