import express from "express";

const storeRoutes = express.Router();

export default storeRoutes;

// /store
// 	/ (GET) - get all Category we have. figma: Banana, Mango, Pineapple, Coconut, ... (For Customer Store)
// 	/:category_id (GET) - get all the products in category (for Customer Store)
// 	/:product_id (GET) - get product details
// 	/shelf (GET) - get all Shelf include products (For Admin)
// 	/shelf/add-product (PUT) (req.body: image, product_id, name, condition, price, status ???, description)
