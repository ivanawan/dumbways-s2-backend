const { User, Transaction, Product, Profile } = require("../models/index-model");
const midtransClient = require("midtrans-client");

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
      where:{idBuyer: req.user.id},
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
    req.body.status='Pending';
    req.body.id =parseInt(req.body.idProduct + Math.random().toString().slice(3, 8));

    const rslt = await Transaction.create(req.body);
    const buyer= await User.findOne({
      where: { id : req.user.id} ,
      include:{ model: Profile, as: "Profil" ,attributes:["phone","gender","image","address"]},
      attributes:['id','name','email','status']
     });
   
    console.log(process.env.MIDTRANS_SERVER_KEY);
    if (buyer.Profil=== null){
      return res.json({
        status:"error",
        message: "complete your profil before transaction"
      })
    }

     let snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: "SB-Mid-server-85FNcSXHjDDX7t3YjXmOC3Js",
    });

    let parameter = {
      transaction_details: {
        order_id: rslt.id,
        gross_amount: rslt.price,
      },
      credit_card: {
        secure: true,
      },
      customer_details: {
        full_name: buyer?.name,
        email: buyer?.email,
        phone: buyer?.Profile?.phone,
      },
    };

    const payment = await snap.createTransaction(parameter);

    return res.json({
      status: "success",
      data: {
        transaction: {
         id:rslt.id,
         idProduct:rslt.idProduct,
         idBuyer:rslt.idBuyer,
         idSeller:rslt.idSeller,
         status:rslt.status,
         payment
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


// Create configurate midtrans client with CoreApi here ...
const MIDTRANS_SERVER_KEY = process.env.MIDTRANS_SERVER_KEY;
const MIDTRANS_CLIENT_KEY = process.env.MIDTRANS_CLIENT_KEY;

const core = new midtransClient.CoreApi();

core.apiConfig.set({
  isProduction: false,
  serverKey: MIDTRANS_SERVER_KEY,
  clientKey: MIDTRANS_CLIENT_KEY
})


 async function notification (req,res) {
  try {

    const statusResponse = await core.transaction.notification(req.body)

    const orderId = statusResponse.order_id;
    const transactionStatus = statusResponse.transaction_status
    const fraudStatus = statusResponse.fraud_status

    if (transactionStatus == "capture") {
      if (fraudStatus == "challenge") {
        updateTransaction("pending", orderId);
        res.status(200);
      } else if (fraudStatus == "accept") {
        updateProduct(orderId);
        updateTransaction("success", orderId);
        res.status(200);
      }
    } else if (transactionStatus == "settlement") {
      updateTransaction("success", orderId);
      res.status(200);
    } else if (
      transactionStatus == "cancel" ||
      transactionStatus == "deny" ||
      transactionStatus == "expire"
    ) {
      updateTransaction("failed", orderId);
      res.status(200);
    } else if (transactionStatus == "pending") {
     
      updateTransaction("pending", orderId);
      res.status(200);
    }

    
  } catch (error) {
    console.log(error)
    res.send({
      message: 'Server Error'
    })
  }
}


const updateTransaction = async (status, transactionId) => {
  await transaction.update(
    {
      status,
    },
    {
      where: {
        id: transactionId,
      },
    }
  );
}; 


const updateProduct = async (orderId) => {
  const transactionData = await transaction.findOne({
    where: {
      id: orderId,
    },
  });

  const productData = await product.findOne({
    where: {
      id: transactionData.idProduct,
    },
  });
  
  const qty = productData.qty - 1;
  await product.update({ qty }, { where: { id: productData.id } });
};

module.exports = { insert,  getAll ,notification};
