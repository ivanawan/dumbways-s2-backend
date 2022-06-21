const { User, Transaction, Product } = require("../models/index-model");

/**
 *  insert data to table Transaction
 * @param {object} req => get all data from request
 * @param {object} res => return value to user
 * @param {object} next => return next argument
 * @returns json
 */
async function insert(req, res, next) {
  try {
    req.body.idBuyer=req.user.id;
    req.body.status='success';
    const rslt = await Transaction.create(req.body);
    return res.json({
      status: "success",
      data: {
        transaction: {
         id:rslt.id,
         idProduct:rslt.idProduct,
         idBuyer:rslt.idBuyer,
         idSeller:rslt.idSeller,
         status:rslt.status
        },
      },
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
 *  get all data from table transaction
 * @param {object} req => get all data from request
 * @param {object} res => return value to user
 * @param {object} next => return next argument
 * @returns json
 */
async function getAll(req, res, next) {
  try {
    const transaction = await Transaction.findAll({
      include: [
        { model: User, as: "Seller", attributes:['id','name','email']},
        { model: User, as: "Buyer" ,attributes:['id','name','email']},
        { model: Product, as: "Product" ,attributes: ['id','image','title','desc']}
      ],
      attributes: { exclude: ["updatedAt", "createdAt","idBuyer","idSeller","idProduct"] },
    });

    return res.json({
      status: "success",
      data: {
        transaction
      },
    });
  } catch (err) {
    console.log(err);
    return res.json({
      status: "error",
      message: "server error",
    });
  }
}



module.exports = { insert,  getAll };
