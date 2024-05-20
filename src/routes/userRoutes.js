import express from "express";

const userRoutes = express.Router();

export default userRoutes;

// /User
// 	/get-profile/:user_id (GET)
// 	/setting/:user_id - Change phone, payment, email, address (PUT)
// 	/buy-product/:user_id - (req.body: products [quantity, product_id]) (PUT)
// 	/order/:user_id - View transactions of specific user (GET)
// 	/order/order-product/:order_id - View details of each transactions (product info) (GET)
