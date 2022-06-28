const {User, Profile}= require("../models/index-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


/**
 *  function to login user
 * @param {object} req => get all data from request 
 * @param {object} res => return value to user
 * @param {object} next => return next argument
 * @returns json 
 */
async function login(req, res, next) {
  const body = req.body;
  try {
    const rslt = await User.findOne({ where: { email: body.email } });

    if (!rslt)
      return res.json({ status: "failed", message: " email not found" });

    if (bcrypt.compareSync(body.password, rslt.password) === true) {
      return res.json({
        status: "success",
        data: {
          user: {
            id:rslt.id,
            name: rslt.name,
            email: rslt.email,
            status: rslt.status,
            token: generateToken({
              id: rslt.id,
              status: rslt.status,
              name: rslt.name,
              email: rslt.email,
            }),
          },
        },
      });
    } else {
      return res.json({ status: "failed", message: "Password not match" });
    }
  } catch (err) {
    return res.json({ status: "error", message: "server error" });
  }
}


/**
 * function to register
 * @param {object} req => get all data from request 
 * @param {object} res => return value to user
 * @param {object} next => return next argument
 * @returns json 
 */
async function register(req, res, next) {
  const body = req.body;
  const find = await User.findOne({ where: { email: body.email } });

  if (find) {
    return res.json({
      status: "error",
      message: "email already use",
    });
  }

  try {
    const rslt = await User.create({
      name: body.name,
      email: body.email,
      password: bcrypt.hashSync(body.password, 12),
    });

    return res.json({
      status: "success",
      data: {
        user: {
          id:rslt.id,
          name: rslt.name,
          email: rslt.email,
          status: rslt.status,
          token: generateToken({
            id: rslt.id,
            status: rslt.status,
            name: rslt.name,
            email: rslt.email,
          }),
        },
      },
    });
  } catch (err) {
    return res.json({
      status: "error",
      message: "server error",
    });
  }
}


/**
 * function to update data user
 * @param {object} req => get all data from request 
 * @param {object} res => return value to user
 * @param {object} next => return next argument
 * @returns json 
 */
async function update(req, res, next) {
  const body = req.body;
  try {
    const rslt = await User.update(
      {
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync(body.password, 12),
      },
      {
        where: { id: req.user.id },
      }
    ); 
  return res.json({
    status: "success",
    message: "data berhasil di update",
  });
  } catch (err) {
    console.log(err);
    return res.json({
      status: "error",
      message: "server error",
    });
  }
 
}

/**
 *  to delete data user
 * @param {object} req => get all data from request 
 * @param {object} res => return value to user
 * @param {object} next => return next argument
 * @returns json 
 */
async function destroy(req, res, next) {
  try {
    await User.destroy({
      where: {
        id: req.user.id,
      },
    });

    return res.json({
      status: "success",
      message: "delete user",
    });
  } catch (error) {
    return res.json({
      status: "error",
      message: "server error",
    });
  }
}

async function getProfile(req,res,next) {
  try {
    const user = await User.findOne({
       where: { id : req.user.id} ,
       include:{ model: Profile, as: "Profil" ,attributes:["phone","gender","image","address"]},
       attributes:['id','name','email','status']
      });
    if (!user)
      return res.json({ status: "failed", message: "id not found" });

    return res.json({ status: "success", data: user});
    
  } catch (err) {
    console.log(err);
    return res.json({ status: "error", message: "server error" });
  }
}

async function insertProfil(req,res,next){
  const body = req.body;
  const find = await Profile.findOne({ where: { iduser: req.user.id } });
 

  if (find) {
    return res.json({
      status: "error",
      message: "profil user has already",
    });
  }

  try { 
    body.iduser=req.user.id;
    body.image =req.file.filename;
    const rslt = await Profile.create(body);

    return res.json({
      status: "success",
    });
  } catch (err) {
    return res.json({
      status: "error",
      message: "server error",
    });
  }
}

/**
 * to generate token jwt
 * @param {object} data 
 * @returns jwt token
 */
function generateToken(data) {
  return jwt.sign(
    data,
    "86eb7ad1792dc09c02626f6b9ec543c15e3bd7b345152769de955793321510fed36078e83749604b8b5a7164296a80d90506ea189ff54b336827a76eb7a8b801",
    { expiresIn: "86400s" }
  );
}

module.exports = { login, register, update, destroy ,getProfile,insertProfil};
