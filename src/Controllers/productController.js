const { Op } = require("sequelize");
const {User,Product}= require("../models/index-model");
const { QueryTypes } = require('sequelize');
/**
 * function inset to insert data ke table product 
 * @param {object} req => get all data from request 
 * @param {object} res => return value to user
 * @param {object} next => return next argument
 * @returns json 
 */
async function insert(req, res, next) {
  try {
    req.body.image = req.file.filename;
    req.body.iduser = req.user.id;
    const rslt = await Product.create(req.body);
    const user = await User.findOne({ where: { id: req.user.id } });
    return res.json({
      status: "success",
      data: {
        product: {
          id: rslt.id,
          image: rslt.image,
          title: rslt.title,
          desc: rslt.desc,
          qty: rslt.qty,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
          },
        },
      },
    });
  } catch (error) {
    console.log(error);
    return res.json({
      status: "error",
      message: "server err",
    });
  }
}

/**
 * update data from product with id user and id product 
 * @param {object} req => get all data from request 
 * @param {object} res => return value to user
 * @param {object} next => return next argument
 * @returns json 
 */
async function update(req, res, next) {
  try {
    const rslt = await Product.findOne({ where: { id: req.params.id ,iduser:req.user.id} });
    if (!rslt) {
      return res.json({
        status: "error",
        message: "data not found",
      });
    }
  
    if(req.file !== undefined){
      req.body.image = req.file.filename;
    }

    await Product.update(req.body,{where:{id:req.params.id}});
    const product = await Product.findOne({ where: { id: req.params.id } , attributes: { 
      exclude: ["updatedAt", "createdAt", "deletedAt", "iduser"]
    }});

    return res.json({
      status: "success",
      data:{
        product
      }
    });
    
  } catch (err) {
    console.log(err);
    return res.json({
      status: "error",
      message: "server err",
    });
  }
}

/**
 *get all data from the table product
 * @param {object} req => get all data from request 
 * @param {object} res => return value to user
 * @param {object} next => return next argument
 * @returns json 
 */
async function getAll(req, res, next) {
  try {
    const products = await Product.findAll({
      attributes: {
        exclude: ["updatedAt", "createdAt", "deletedAt", "iduser"],
      },
    });
    return res.json({
      status: "success",
      data: {
        products,
      },
    });
  } catch (err) {
    return res.json({
      status: "error",
      message: "server err",
    });
  }
}

/**
 * get one get only one data 
 * @param {object} req => get all data from request 
 * @param {object} res => return value to user
 * @param {object} next => return next argument
 * @returns json 
 */
async function getOne(req, res, next) {
  try {
    const product = await Product.findOne({
      where:{id:req.params.id},
      attributes: { 
        exclude: ["updatedAt", "createdAt", "deletedAt", "iduser"]
       },
    });
    return res.json({
      status: "success",
      data: {
        product,
      },
    });
  } catch (err) {
    console.log(err);
    return res.json({
      status: "error",
      message: "server err",
    });
  }
}

/**
 * delete data by id
 * @param {object} req => get all data from request 
 * @param {object} res => return value to user
 * @param {object} next => return next argument
 * @returns json 
 */
async function destroy(req, res, next) {
  try {
    const rslt = await Product.findOne({ where: { id: req.params.id,iduser:req.user.id }});
    if (!rslt) {
      return res.json({
        status: "error",
        message: "data not found",
      });
    }

    await Product.destroy({ where: { id: req.params.id } });
    return res.json({
      status: "success",
      data: {
        id: req.params.id,
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
 *get all deleted data from the table product
 * @param {object} req => get all data from request 
 * @param {object} res => return value to user
 * @param {object} next => return next argument
 * @returns json 
 */
 async function getDeleted(req, res, next) {
  try {
    const products = await Product.findAll({
      where:{iduser:req.user.id,deletedAt:{[Op.ne]:null}},
      paranoid:false,
      attributes: {
        exclude: ["updatedAt", "createdAt", "deletedAt", "iduser"],
      },
    });
    return res.json({
      status: "success",
      data: {
        products,
      },
    });
  } catch (err) {
    console.log(err);
    return res.json({
      status: "error",
      message: "server err",
    });
  }
}


/**
 * restore deleted data from product with id user and id product 
 * @param {object} req => get all data from request 
 * @param {object} res => return value to user
 * @param {object} next => return next argument
 * @returns json 
 */
 async function restore(req, res, next) {
  try {
    const rslt = await Product.findOne({ where: { id: req.params.id,iduser:req.user.id }, paranoid:false,});
    if (!rslt) {
      return res.json({
        status: "error",
        message: "data not found",
      });
    }
  
    if(req.file !== undefined){
      req.body.image = req.file.filename;
    }

    await rslt.restore({where:{id:req.params.id}});
    const product = await Product.findOne({ where: { id: req.params.id } , attributes: { 
      exclude: ["updatedAt", "createdAt", "deletedAt", "iduser"]
    }});

    return res.json({
      status: "success",
      data:{
        product
      }
    });
    
  } catch (err) {
    console.log(err);
    return res.json({
      status: "error",
      message: "server err",
    });
  }
}



/**
 * deleted data from delete list in table product
 * @param {object} req => get all data from request 
 * @param {object} res => return value to user
 * @param {object} next => return next argument
 * @returns json 
 */
async function destroyDeletedData(req, res, next) {
  try {
    const rslt = await Product.findOne({ where: { id: req.params.id,iduser:req.user.id } ,paranoid:false,});
    if (!rslt) {
      return res.json({
        status: "error",
        message: "data not found",
      });
    }
    
    await Product.destroy({ where: { id: req.params.id } ,force: true, paranoid:false,});
    return res.json({
      status: "success",
      data: {
        id: req.params.id,
      },
    });
  } catch (err) {
    return res.json({
      status: "error",
      message: "server error",
    });
  }
}

module.exports = { insert, update, destroy, getAll, getOne ,getDeleted,restore,destroyDeletedData};
