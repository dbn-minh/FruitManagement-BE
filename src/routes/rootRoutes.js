import express from "express";
import authRoutes from "./authRoutes.js";
import userRoutes from "./userRoutes.js";
import storeRoutes from "./storeRoutes.js";
import warehouseRoutes from "./warehouseRoutes.js";

const rootRoute = express.Router();

rootRoute.use("/auth", authRoutes);

rootRoute.use("/user", userRoutes);

rootRoute.use("/store", storeRoutes);

rootRoute.use("/warehouse", warehouseRoutes);

export default rootRoute;
