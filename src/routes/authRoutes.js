import express from "express";
import { login } from "../controllers/authController.js";

const authRoutes = express.Router();

authRoutes.post("/login", login);

export default authRoutes;

// /Auth
// 	(Có cần refreshToken?)
// 	/login (POST)
// 	/signup (POST)
