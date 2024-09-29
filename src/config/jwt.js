import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const createAccessToken = (userId) => {
  // tạo token
  // sign(params1, params2, params3)
  // params1: tạo payload và lưu vào token
  // params2: key để tạo token
  // params3: setting timelife của token và thuật toán để tạo token
  const accessToken = jwt.sign({ userId }, process.env.JWT_SECRET, {
    algorithm: "HS256",
    expiresIn: "1d",
  });

  return accessToken;
};

const verifyToken = (token) => {
  try {
    jwt.verify(token, process.env.JWT_SECRET);
    return true;
  } catch (error) {
    return false;
  }
};

const middlewareToken = (req, res, next) => {
  const { token } = req.headers;

  if (!verifyToken(token)) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  next();
};

export { createAccessToken, middlewareToken };
