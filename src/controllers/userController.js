import { responseData } from "../config/Response.js";
import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import { Sequelize } from "sequelize";

let model = initModels(sequelize);
let Op = Sequelize.Op;

export const getProfile = async (req, res) => {
  try {
    let { user_id } = req.params;
    let data = await model.users.findOne({
      where: { user_id },
    });
    responseData(res, "Success", data, 200);
  } catch {
    responseData(res, "Error ...", "", 500);
  }
};

export const updateProfile = async (req, res) => {
  try {
    let { user_id } = req.params;
    let { phone, bank_account, email, address } = req.body;
    let getNewProfile = await model.users.findOne({
      where: {
        user_id,
      },
    });
    getNewProfile.phone = phone;
    getNewProfile.bank_account = bank_account;
    getNewProfile.email = email;
    getNewProfile.address = address;

    await model.users.update(getNewProfile.dataValues, {
      where: {
        user_id,
      },
    });
    let data = await model.users.findOne({
      where: {
        user_id,
      },
    });
    responseData(res, "Updated profile successfully", data, 200);
  } catch {
    responseData(res, "Error", "", 500);
  }
};

export const checkOut = async (req, res) => {
  try {
    let { user_id } = req.params;

    const products = req.body.products;

    // If the cart is empty, send a response indicating that the cart is empty
    if (products.length === 0) {
      responseData(res, "Cart is empty", "", 400);
      return; // Exit the function early
    }

    // Create a new order record in the orders table
    const newOrder = await model.orders.create({
      user_id,
    });

    let total_price = 0;
    let order_quantity = 0;

    for (const product of products) {
      const { product_id, quantity } = product;

      const shelfProduct = await model.shelf_products.findOne({
        where: { product_id },
      });

      // Check if there is enough quantity available on the shelf
      if (shelfProduct.quantity < quantity) {
        responseData(
          res,
          `Insufficient quantity available for product with ID ${product_id}`,
          "",
          400
        );
        return;
      }

      // Decrease the quantity in shelf_products
      await shelfProduct.update({ quantity: shelfProduct.quantity - quantity });

      // Find the product details
      const productDetails = await model.products.findByPk(product_id);

      // Calculate the subtotal for this product
      const subtotal = productDetails.selling_price * quantity;

      // Add the subtotal to the total price
      total_price += subtotal;

      order_quantity += quantity;

      // Create a record in order_products linking the order to the product
      await model.order_products.create({
        order_id: newOrder.order_id,
        product_id,
        order_product_quantity: quantity, // wait for database
        subtotal, // wait for database
      });
    }

    // Update the order_id in order_products with the ID of the newly created order
    await model.orders.update(
      { total_price: total_price, order_quantity: order_quantity },
      { where: { order_id: newOrder.order_id } }
    );
    responseData(res, "Checkout successful", newOrder, 200);
  } catch {
    responseData(res, "Error ...", "", 500);
  }
};

// waiting for database
export const getOrder = async (req, res) => {
  // try {
  let { user_id } = req.params;
  let data = await model.orders.findOne({
    where: { user_id },
    include: ["order_products", "product_id_products"],
  });
  responseData(res, "Success", data, 200);
  // } catch {
  //   responseData(res, "Error ...", "", 500);
  // }
};
