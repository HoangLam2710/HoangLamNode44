import express from "express";
import {
  createUser,
  deleteUser,
  getUsers,
  updateUser,
  uploadAvatar,
  uploadAvatarCloud,
} from "../controllers/user.controller.js";
import { upload } from "../config/upload.js";
import { uploadCloud } from "../config/upload_cloud.js";

const userRoutes = express.Router();

// userRoutes.post("/:id", createUser);
userRoutes.post("/create-user", createUser);
userRoutes.get("/get-users", getUsers);
userRoutes.delete("/delete-user/:user_id", deleteUser);
userRoutes.put("/update-user/:user_id", updateUser);
userRoutes.post("/upload-avatar", upload.single("avatar"), uploadAvatar);
userRoutes.post(
  "/upload-avatar-cloud",
  uploadCloud.single("avatar"),
  uploadAvatarCloud,
);

export default userRoutes;
