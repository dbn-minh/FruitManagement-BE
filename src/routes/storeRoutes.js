import express from "express";
import {
  addProduct,
  getCategory,
  getCategoryProducts,
  getProduct,
  getProductDetails,
  removeProduct,
  searchAdminProducts,
  searchProducts,
} from "../controllers/storeController.js";

const storeRoutes = express.Router();

// Store page of Customer
storeRoutes.get("/category", getCategory);

// Choose 1 category then fetch all the products of chosen category in Customer
storeRoutes.get("/category/:category_id", getCategoryProducts);

// See the product details in Customer
storeRoutes.get("/category/:category_id/:product_id", getProductDetails);

// Give the Product list in Admin's store
storeRoutes.get("/allProduct", getProduct);

// Add new product in Admin's store
storeRoutes.post("/allProduct/add-product", addProduct);

// Delete product in Admin's store
storeRoutes.put("/allProduct/remove-product", removeProduct);

// search products in store
storeRoutes.get("/search/:product_name", searchProducts);

// Search products in Admin Store
storeRoutes.get("/search-all/:product_name", searchAdminProducts);

export default storeRoutes;
