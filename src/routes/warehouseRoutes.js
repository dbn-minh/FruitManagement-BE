import express from "express";
import {
  addProductToShelf,
  getImport,
  getInventory,
  getProductsShelfs,
  reorder,
  reorderProduct,
} from "../controllers/warehouseController.js";

const warehouseRoutes = express.Router();

// Get all products in warehouse (inventory)
warehouseRoutes.get("/", getInventory);

// Get all products in warehouse that quantity = 0
warehouseRoutes.get("/reorder", reorder);

// Reorder  products
warehouseRoutes.put("/reorder/:product_id", reorderProduct);

// Get all Product in shelf (Show quantity in warehouse and shelf)
warehouseRoutes.get("/stock-adjust", getProductsShelfs);

// Add product from warehouse to shelf
warehouseRoutes.post("/stock-adjust/add-shelf", addProductToShelf);

// Get All imports (order history)
warehouseRoutes.get("/import", getImport);

export default warehouseRoutes;
