const Kategori=require("./Kategori");
const Product =require("./product");
const Profile= require("./profile");
const User= require("./User");
const Transaction =require("./Transaction");
const kategoriproduct =require("./kategoriProduct");
const Chat = require("./chat");

/**
 *  ------------------ association table user ------------------
 */
User.hasOne(Profile, { as:'Profil',sourceKey: 'id', foreignKey: 'iduser' });
User.hasMany(Product, { sourceKey: 'id', foreignKey: 'iduser' });
User.hasMany(Transaction, { as:'Buyer' , foreignKey: 'idBuyer' });
User.hasMany(Transaction, { as:'Seller', foreignKey: 'idSeller'});


/**
 *  ------------------ association table Transaction ------------------
 */
Transaction.belongsTo(Product, {as:'Product', targetKey:'id',foreignKey: 'idProduct' });
Transaction.belongsTo(User,{as:'Buyer', targetKey:'id',foreignKey:'idBuyer'});
Transaction.belongsTo(User,{as:'Seller', targetKey:'id',foreignKey:'idSeller'});



module.exports={
    Chat,
    Kategori,
    kategoriproduct,
    Product,
    Profile,
    User,
    Transaction
}