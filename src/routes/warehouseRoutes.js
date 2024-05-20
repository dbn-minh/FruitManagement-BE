import express from "express";

const warehouseRoutes = express.Router();

export default warehouseRoutes;

// /warehouse
// 	/ (GET) - get all Export include productName, attributes: quantity, status ???
// 	/reorder ???
// 	/import (GET) - get all import order history include supplier (Price, arrival_date ???)
// 	/stock-adjust (GET) - get export include shelf
// 	/add-to-shelf (PUT)
// 	/shelf (GET) - get all fruits on shelf (Admin)
