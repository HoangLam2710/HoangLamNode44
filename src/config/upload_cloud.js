import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "avatar",
    format: async (req, file) => {
      const validImgFormat = ["jpg", "jpeg", "png", "gif", "webp", "heic"];

      // mimetype: image/jpeg
      const fileFormat = file.mimetype.split("/")[1];

      if (validImgFormat.includes(fileFormat)) {
        return fileFormat;
      }
      return "jpg";
    },
    // transformation: [
    //   {
    //     width: 800,
    //     quality: "auto:good",
    //     fetch_format: "auto",
    //   },
    // ],
    public_id: (req, file) => file.originalname.split(".")[0],
  },
});

export const uploadCloud = multer({ storage });
