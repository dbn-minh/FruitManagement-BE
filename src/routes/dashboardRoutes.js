import express from "express";
import { getInfoDashboard } from "../controllers/dashboardController.js";

const dashboardRoutes = express.Router();

dashboardRoutes.get("/", getInfoDashboard);

export default dashboardRoutes;
