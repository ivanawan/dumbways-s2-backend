const {Kategori}= require("../models/index-model");
/**
 *  insert dtaa to table kategori
 * @param {object} req => get all data from request 
 * @param {object} res => return value to user
 * @param {object} next => return next argument
 * @returns json 
 */
async function insert(req, res, next) {
  try {
    const category = await Kategori.create({ name: req.body.name });
    return res.json({
      status: "success",
      message: "kategori berhasil di tambahkan",
      data: {
        category: {
          id: category.id,
          name: category.name,
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
 *  update data in table kategori
 * @param {object} req => get all data from request 
 * @param {object} res => return value to user
 * @param {object} next => return next argument
 * @returns json 
 */
async function update(req, res, next) {
  try {
    const rslt = await Kategori.findOne({ where: { id: req.params.id } });
    if (!rslt) {
      return res.json({
        status: "error",
        message: "data not found",
      });
    }

    const update = await Kategori.update(
      { name: req.body.name },
      { where: { id: req.params.id } }
    );

    const category = await Kategori.findOne({ where: { id: req.params.id } });
    return res.json({
      status: "success",
      data: {
        category: {
          id: category.id,
          name: category.name,
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
 *  get all data from table kategori
 * @param {object} req => get all data from request 
 * @param {object} res => return value to user
 * @param {object} next => return next argument
 * @returns json 
 */
async function getAll(req, res, next) {
  try {
    const categories = await Kategori.findAll({
      attributes: { exclude: ["updatedAt", "createdAt"] },
    });

    return res.json({
      status: "success",
      data: {
        categories,
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
 * get only one data from table kategori
 * @param {object} req => get all data from request 
 * @param {object} res => return value to user
 * @param {object} next => return next argument
 * @returns json 
 */
async function getOne(req, res, next) {
  try {
    const rslt = await Kategori.findOne({ where: { id: req.params.id } });
    if (!rslt) {
      return res.json({
        status: "error",
        message: "data not found",
      });
    }
    return res.json({
      status: "success",
      data: {
        category: {
          id: rslt.id,
          name: rslt.name,
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
 * delete data from  table kategori
 * @param {object} req => get all data from request 
 * @param {object} res => return value to user
 * @param {object} next => return next argument
 * @returns json 
 */
async function destroy(req, res, next) {
  try {
    const data = await Kategori.findOne({ where: { id: req.params.id } });
    if (!data) {
      return res.json({
        status: "error",
        message: "data not found",
      });
    }
    const rslt = await Kategori.destroy({ where: { id: req.params.id } });
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

module.exports = { insert, update, destroy, getAll, getOne };
