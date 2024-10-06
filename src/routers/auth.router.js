import express from "express";
import {
  register,
  login,
  loginWithFacebook,
  extendToken,
  loginAsyncKey,
} from "../controllers/auth.controller.js";

const authRoutes = express.Router();

authRoutes.post("/register", register);
authRoutes.post("/login", login);
authRoutes.post("/login-face", loginWithFacebook);
authRoutes.post("/extend-token", extendToken);
authRoutes.post("/login-async-key", loginAsyncKey);

export default authRoutes;
