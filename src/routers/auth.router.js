import express from "express";
import {
  register,
  login,
  loginWithFacebook,
} from "../controllers/auth.controller.js";

const authRoutes = express.Router();

authRoutes.post("/register", register);
authRoutes.post("/login", login);
authRoutes.post("/login-face", loginWithFacebook);

export default authRoutes;
