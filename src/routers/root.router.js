import express from "express";
import userRoutes from "./user.router.js";

// tạo Object router tổng
const rootRoutes = express.Router();

rootRoutes.use("/users", userRoutes);

// export rootRoutes để sử dụng ở file index.js
export default rootRoutes;
