import express from "express";
import { login, signup } from "../controllers/authController.js";

const authRoutes = express.Router();

//login
authRoutes.post("/login", login);

//signup
authRoutes.post("/signup", signup);

export default authRoutes;
