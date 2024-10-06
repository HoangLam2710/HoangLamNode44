import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import fs from "fs";

const accessTokenPrivateKey = fs.readFileSync("key/access_token.private.key");
const accessTokenPublicKey = fs.readFileSync("key/access_token.public.key");
const refreshTokenPrivateKey = fs.readFileSync("key/refresh_token.private.key");
const refreshTokenPublicKey = fs.readFileSync("key/refresh_token.public.key");

dotenv.config();

const createAccessToken = (data) => {
  // tạo token
  // sign(params1, params2, params3)
  // params1: tạo payload và lưu vào token
  // params2: key để tạo token
  // params3: setting timelife của token và thuật toán để tạo token
  const accessToken = jwt.sign({ payload: data }, process.env.JWT_SECRET, {
    algorithm: "HS256",
    expiresIn: "10s",
  });
  return accessToken;
};

const createRefreshToken = (data) => {
  const refreshToken = jwt.sign(
    { payload: data },
    process.env.JWT_REFRESH_SECRET,
    {
      algorithm: "HS256",
      expiresIn: "7d",
    },
  );
  return refreshToken;
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

const createAccessTokenAsyncKey = (data) => {
  const accessToken = jwt.sign({ payload: data }, accessTokenPrivateKey, {
    algorithm: "RS256",
    expiresIn: "10s",
  });
  return accessToken;
};

const createRefreshTokenAsyncKey = (data) => {
  const refreshToken = jwt.sign({ payload: data }, refreshTokenPrivateKey, {
    algorithm: "RS256",
    expiresIn: "7d",
  });
  return refreshToken;
};

const verifyAccessTokenAsyncKey = (token) => {
  try {
    jwt.verify(token, accessTokenPublicKey);
    return true;
  } catch (error) {
    return false;
  }
};

const middlewareTokenAsyncKey = (req, res, next) => {
  const { token } = req.headers;

  if (!verifyAccessTokenAsyncKey(token)) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  next();
};

export {
  createAccessToken,
  createRefreshToken,
  middlewareToken,
  createAccessTokenAsyncKey,
  createRefreshTokenAsyncKey,
  middlewareTokenAsyncKey,
};
