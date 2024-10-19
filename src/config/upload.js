import multer, { diskStorage } from "multer";

export const upload = multer({
  storage: diskStorage({
    destination: process.cwd() + "/public/imgs",
    filename: (req, file, callback) => {
      // timestamp_img_name
      const newName = new Date().getTime() + "_" + file.originalname;
      callback(null, newName);
    },
  }),
});
