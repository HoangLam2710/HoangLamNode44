import express from "express";
import userRoutes from "./user.router.js";
import videoRoutes from "./video.router.js";

// tạo Object router tổng
const rootRoutes = express.Router();

rootRoutes.use("/users", userRoutes);
rootRoutes.use("/videos", videoRoutes);

// export rootRoutes để sử dụng ở file index.js
export default rootRoutes;
