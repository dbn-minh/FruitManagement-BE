import express from "express";
import authRoutes from "./authRoutes.js";
import storeRoutes from "./storeRoutes.js";
import warehouseRoutes from "./warehouseRoutes.js";
import dashboardRoutes from "./dashboardRoutes.js";
import userRoutes from "./userRoutes.js";

const rootRoute = express.Router();

rootRoute.use("/auth", authRoutes);

rootRoute.use("/user", userRoutes);

rootRoute.use("/store", storeRoutes);

rootRoute.use("/warehouse", warehouseRoutes);

rootRoute.use("/dashboard", dashboardRoutes);

export default rootRoute;
