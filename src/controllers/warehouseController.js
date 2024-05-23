import { responseData } from "../config/Response.js";
import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";

let model = initModels(sequelize);

export const getInventory = async (req, res) => {
  try {
    let data = await model.warehouse_products.findAll({
      include: ["product"],
    });
    responseData(res, "Success", data, 200);
  } catch {
    responseData(res, "Error ...", "", 500);
  }
};

export const reorder = async (req, res) => {
  try {
    let data = await model.warehouse_products.findAll({
      include: ["product"],
      where: {
        quantity: 0,
      },
    });
    responseData(res, "Success", data, 200);
  } catch {
    responseData(res, "Error ...", "", 500);
  }
};

export const reorderProduct = async (req, res) => {
  try {
    let { product_id } = req.params;
    let { quantity } = req.body;
    let data = await model.warehouse_products.findOne({
      where: {
        product_id,
      },
    });

    data.quantity = quantity;

    await model.warehouse_products.update(data.dataValues, {
      where: {
        product_id: data.product_id,
      },
    });
    responseData(res, "Success", data, 200);
  } catch {
    responseData(res, "Error ...", "", 500);
  }
};

// Not done yet
export const getProductsShelfs = async (req, res) => {
  try {
    let data = await model.products.findAll({
      // where: {
      //   product_id,
      // },
      include: [
        {
          model: model.shelf_products,
          as: "shelf_products",
          required: true, // This ensures that only products with shelf_products are included
        },
        {
          model: model.warehouse_products,
          as: "warehouse_products",
          required: true,
        },
      ],
    });
    responseData(res, "Success", data, 200);
  } catch {
    responseData(res, "Error ...", "", 500);
  }
};

// add the function to create the new export_id
export const addProductToShelf = async (req, res) => {
  try {
    let products = req.body.products;

    if (products.length === 0) {
      responseData(res, "Nothing to add", "", 400);
      return; // Exit the function early
    }

    for (const product of products) {
      const { product_id, quantity, shelf_id } = product;

      // Check if there is enough quantity in the warehouse
      const warehouseProduct = await model.warehouse_products.findOne({
        where: {
          product_id,
        },
      });

      if (!warehouseProduct || warehouseProduct.quantity < quantity) {
        responseData(
          res,
          `Insufficient quantity in the warehouse for product ID ${product_id}`,
          "",
          400
        );
        return; // Exit the function if insufficient quantity
      }

      // Update shelf_products with the desired quantity
      await model.shelf_products.increment("quantity", {
        by: quantity,
        where: {
          shelf_id, // Assuming shelf_id is provided in the request body
          product_id,
        },
      });

      // Update the quantity of the product in the warehouse
      await model.warehouse_products.decrement("quantity", {
        by: quantity,
        where: {
          product_id,
        },
      });
    }
    responseData(res, "Success", "", 200);
  } catch {
    responseData(res, "Error ...", "", 500);
  }
};

export const getImport = async (req, res) => {
  try {
    let data = await model.imports.findAll({
      include: ["supplier"],
    });
    responseData(res, "Success", data, 200);
  } catch {
    responseData(res, "Error ...", "", 500);
  }
};
