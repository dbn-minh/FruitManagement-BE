import express from "express";
import { login, signup } from "../controllers/authController.js";

const authRoutes = express.Router();

//login
authRoutes.get("/login", login);

//signup
authRoutes.get("/signup", signup);

export default authRoutes;

// /Auth
// 	(Có cần refreshToken?)
// 	/login (POST)
// 	/signup (POST)
