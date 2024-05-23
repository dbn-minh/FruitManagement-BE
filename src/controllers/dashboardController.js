import { responseData } from "../config/Response.js";
import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import { Model, Sequelize } from "sequelize";

let model = initModels(sequelize);

// Pending, not done yet
export const getInfoDashboard = async (req, res) => {
  // try {
  const totalOrdersResult = await model.orders.count();
  const productionVolumeResult = await model.orders.sum("order_quantity");
  const totalRevenueResult = await model.orders.sum("total_price");

  const totalRevenue = totalRevenueResult
    ? parseFloat(totalRevenueResult.toFixed(2))
    : 0;
  const totalOrders = totalOrdersResult || 0;
  const productionVolume = productionVolumeResult || 0;

  // Fetch total import price of all products in warehouseProducts
  const warehouseProductsResult = await model.warehouse_products.findAll({
    include: [
      {
        model: model.products,
        as: "product",
        attributes: ["import_price"],
      },
    ],
  });

  // Calculate total import price from warehouseProducts
  let totalImportPrice = 0;
  if (warehouseProductsResult) {
    warehouseProductsResult.forEach((warehouseProduct) => {
      const importPrice = warehouseProduct.product.import_price || 0;
      totalImportPrice += importPrice;
    });
  }

  // Fetch top 3 products with the most orders
  const topProductsResult = await model.order_products.findAll({
    attributes: [
      "product_id",
      [Sequelize.literal("SUM(order_product_quantity)"), "total_orders"],
    ],
    include: [
      {
        model: model.products,
        as: "product",
        attributes: ["product_name", "product_img"],
      },
    ],
    group: ["product_id"],
    order: [[Sequelize.literal("total_orders"), "DESC"]],
    limit: 3,
  });

  // Fetch total import price of all products in warehouseProducts
  const warehouseProductsQuantity = await model.warehouse_products.sum(
    "quantity"
  );

  // Fetch total quantity of all products in shelf_products
  const shelfProductsResult = await model.shelf_products.sum("quantity");

  // Fetch total quantity of all products sold in order_products
  const totalSoldResult = await model.order_products.sum(
    "order_product_quantity"
  );

  const responseData = {
    totalRevenue,
    totalOrders,
    productionVolume,
    totalImportPrice,
    topProductsResult,
    warehouseProductsQuantity,
    shelfProductsResult,
    totalSoldResult,
  };

  res.status(200).json({
    status: "Success",
    data: responseData,
  });
  // } catch (error) {
  //   res.status(500).json({
  //     status: "Error",
  //     message: "An error occurred while fetching dashboard information.",
  //     error: error.message, // Including the error message for debugging purposes
  //   });
  // }
};
