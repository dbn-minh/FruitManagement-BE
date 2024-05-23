import { responseData } from "../config/Response.js";
import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import { Op } from "sequelize";

let model = initModels(sequelize);

export const getCategory = async (req, res) => {
  try {
    let data = await model.categories.findAll();
    responseData(res, "Success", data, 200);
  } catch {
    responseData(res, "Error ...", "", 500);
  }
};

export const getCategoryProducts = async (req, res) => {
  try {
    let { category_id } = req.params;
    let data = await model.products.findAll({
      where: {
        category_id,
        selling_price: {
          [Op.gt]: 0,
        },
      },
    });
    responseData(res, "Success", data, 200);
  } catch {
    responseData(res, "Error ...", "", 500);
  }
};

export const getProductDetails = async (req, res) => {
  try {
    let { product_id, category_id } = req.params;
    let data = await model.products.findOne({
      where: {
        category_id,
        product_id,
      },
    });
    // if (!data) {
    //   return responseData(res, "No products to display", "", 404);
    // }
    responseData(res, "Success", data, 200);
  } catch {
    responseData(res, "Error ...", "", 500);
  }
};

export const getProduct = async (req, res) => {
  try {
    let data = await model.products.findAll({
      // include: ["shelf", "product"],
      // Only get products which selling_price >= 0
      where: {
        selling_price: {
          [Op.gt]: 0,
        },
      },
    });
    responseData(res, "Success", data, 200);
  } catch {
    responseData(res, "Error ...", "", 500);
  }
};

export const removeProduct = async (req, res) => {
  try {
    let { product_id } = req.body;
    let getProduct = await model.products.findOne({
      where: {
        product_id,
      },
    });
    if (!getProduct) {
      return responseData(res, "No product found", "", 404);
    }
    // Selling_price -> -1: not fetch
    getProduct.selling_price = 0;
    await model.products.update(getProduct.dataValues, {
      where: {
        product_id: getProduct.product_id,
      },
    });

    responseData(res, "successfully", "Deleted product", 200);
  } catch {
    responseData(res, "Error...", "", 500);
  }
};

export const addProduct = async (req, res) => {
  try {
    let {
      product_name,
      product_description,
      selling_price,
      product_condition,
      product_img,
      category_id,
    } = req.body;
    let data = await model.products.create({
      product_name,
      product_description,
      selling_price,
      product_condition,
      product_img,
      category_id,
      import_price: 1,
    });

    responseData(res, "successfully", data, 200);
  } catch (exception) {
    responseData(res, "Error...", "", 500);
  }
};

export const searchProducts = async (req, res) => {
  try {
    let { product_name } = req.params;
    let data = await model.products.findAll({
      where: {
        selling_price: {
          [Op.gte]: 0,
        },
        product_name: {
          [Op.like]: "%" + product_name + "%",
        },
      },
    });
    responseData(res, "successfully", data, 200);
  } catch {
    responseData(res, "Error", "", 500);
  }
};

export const searchAdminProducts = async (req, res) => {
  try {
    let { product_name } = req.params;
    let data = await model.products.findAll({
      where: {
        // selling_price: {
        //   [Op.gte]: 0,
        // },
        product_name: {
          [Op.like]: "%" + product_name + "%",
        },
      },
    });
    responseData(res, "successfully", data, 200);
  } catch {
    responseData(res, "Error", "", 500);
  }
};
