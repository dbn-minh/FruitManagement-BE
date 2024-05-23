import express from "express";
import { getInfo } from "../controllers/dashboardController.js";

const dashboardRoutes = express.Router();

dashboardRoutes.get("/", getInfo);

export default dashboardRoutes;
