import { responseData } from "../config/Response.js";
import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import { Op } from "sequelize";

let model = initModels(sequelize);

// Done, get all the category for choosing
export const getCategory = async (req, res) => {
  try {
    let data = await model.categories.findAll();
    responseData(res, "Success", data, 200);
  } catch {
    responseData(res, "Error ...", "", 500);
  }
};

// After choosing the category, get all the products on shelf belong to the category chosen
// and the quantity of that product in shelf must > 0
export const getCategoryProducts = async (req, res) => {
  try {
    let { category_id } = req.params;
    let data = await model.products.findAll({
      where: {
        category_id,
      },
      include: [
        {
          model: model.shelf_products,
          as: "shelf_products",
          required: true,
          where: {
            quantity: {
              [Op.gt]: 0, // Use shelf_products.quantity as condition
            },
          },
          attributes: [],
        },
      ],
    });
    responseData(res, "Success", data, 200);
  } catch {
    responseData(res, "Error ...", "", 500);
  }
};

// Click to see details of product
export const getProductDetails = async (req, res) => {
  try {
    let { product_id, category_id } = req.params;
    let data = await model.products.findOne({
      where: {
        category_id,
        product_id,
      },
      include: [
        {
          model: model.shelves,
          as: "shelf_id_shelves",
          attributes: ["date_on_shelf"],
        },
      ],
    });
    responseData(res, "Success", data, 200);
  } catch {
    responseData(res, "Error ...", "", 500);
  }
};

// Get all product in Products, but if date on shelf is empty -> must return null in FE
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
      include: [
        {
          model: model.shelves,
          as: "shelf_id_shelves",
          attributes: ["date_on_shelf"],
        },
      ],
    });
    responseData(res, "Success", data, 200);
  } catch {
    responseData(res, "Error ...", "", 500);
  }
};

// Remove the quantity in warehouse and shelf, then
export const removeProduct = async (req, res) => {
  try {
    let { product_id } = req.body;
    // Update quantity to 0 in warehouse_products
    await model.warehouse_products.update(
      { quantity: 0 },
      {
        where: {
          product_id,
        },
      }
    );

    // Update quantity to 0 in shelf_products
    await model.shelf_products.update(
      { quantity: 0 },
      {
        where: {
          product_id,
        },
      }
    );

    responseData(res, "successfully", "Deleted product", 200);
  } catch {
    responseData(res, "Error...", "", 500);
  }
};

// Add all the information, img not yet upload by file
export const addProduct = async (req, res) => {
  try {
    let {
      product_name,
      description,
      selling_price,
      product_condition,
      product_img,
      category_id,
    } = req.body;
    let data = await model.products.create({
      product_name,
      description,
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

// export const searchProducts = async (req, res) => {
//   try {
//     let { product_name } = req.params;
//     let data = await model.products.findAll({
//       where: {
//         selling_price: {
//           [Op.gte]: 0,
//         },
//         product_name: {
//           [Op.like]: "%" + product_name + "%",
//         },
//       },
//     });
//     responseData(res, "successfully", data, 200);
//   } catch {
//     responseData(res, "Error", "", 500);
//   }
// };

// export const searchAdminProducts = async (req, res) => {
//   try {
//     let { product_name } = req.params;
//     let data = await model.products.findAll({
//       where: {
//         // selling_price: {
//         //   [Op.gte]: 0,
//         // },
//         product_name: {
//           [Op.like]: "%" + product_name + "%",
//         },
//       },
//     });
//     responseData(res, "successfully", data, 200);
//   } catch {
//     responseData(res, "Error", "", 500);
//   }
// };
