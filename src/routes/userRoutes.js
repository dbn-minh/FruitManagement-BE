import express from "express";
import {
  checkOut,
  getOrder,
  getProfile,
  updateProfile,
} from "../controllers/userController.js";

const userRoutes = express.Router();

// Get user profile
userRoutes.get("/:user_id", getProfile);

// Update profile
userRoutes.put("/:user_id/edit", updateProfile);

// Checkout to buy products
userRoutes.post("/:user_id/checkout", checkOut);

// View Order (transactions)
userRoutes.get("/:user_id/order", getOrder);

export default userRoutes;

// /User
// 	/get-profile/:user_id (GET)
// 	/setting/:user_id - Change phone, payment, email, address (PUT)
// 	/buy-product/:user_id - (req.body: products [quantity, product_id]) (PUT)
// 	/order/:user_id - View transactions of specific user (GET)
// 	/order/order-product/:order_id - View details of each transactions (product info) (GET)
