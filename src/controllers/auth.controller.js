import bcrypt from "bcrypt";
import { BAD_REQUEST, INTERNAL_SERVER, OK, UNAUTHORIZED } from "../../const.js";
import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import configDb from "../config/connect_db.js";
import { transporter, createMailOptions } from "../config/transporter.js";
import {
  createAccessToken,
  createAccessTokenAsyncKey,
  createRefreshToken,
  createRefreshTokenAsyncKey,
} from "../config/jwt.js";

const models = initModels(sequelize);

const register = async (req, res) => {
  try {
    const { fullName, email, pass } = req.body;

    const userExist = await models.users.findOne({
      where: { email },
    });

    if (userExist) {
      return res
        .status(BAD_REQUEST)
        .json({ message: "User already exists", data: null });
    }

    const userNew = await models.users.create({
      full_name: fullName,
      email,
      pass_word: bcrypt.hashSync(pass, 10),
    });

    // config info mail
    const mailOptions = createMailOptions(email, fullName);
    // send mail
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        return res
          .status(INTERNAL_SERVER)
          .json({ message: "Sending email error" });
      } else {
        return res
          .status(201)
          .json({ message: "Register succesfully", data: userNew });
      }
    });
  } catch (error) {
    return res.status(INTERNAL_SERVER).json({ message: "error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, pass } = req.body;

    const user = await models.users.findOne({
      where: { email },
    });
    if (!user) {
      return res.status(BAD_REQUEST).json({ message: "User not found" });
    }

    const isMatch = bcrypt.compareSync(pass, user.pass_word);
    if (!isMatch) {
      return res.status(BAD_REQUEST).json({ message: "Incorrect password" });
    }

    const accessToken = createAccessToken({ userId: user.user_id });
    const refreshToken = createRefreshToken({ userId: user.user_id });
    await models.users.update(
      {
        refresh_token: refreshToken,
      },
      {
        where: { user_id: user.user_id },
      },
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(OK).json({
      message: "Login succesfully",
      data: accessToken,
    });
  } catch (error) {
    return res.status(INTERNAL_SERVER).json({ message: "error" });
  }
};

const loginWithFacebook = async (req, res) => {
  try {
    const { id, name, email } = req.body;
    let user;
    user = await models.users.findOne({
      where: { face_app_id: id },
    });
    if (!user) {
      user = await models.users.create({
        face_app_id: id,
        full_name: name,
        email,
      });
    }
    const accessToken = createAccessToken({ userId: user.user_id });
    return res
      .status(OK)
      .json({ message: "Login succesfully", data: accessToken });
  } catch (error) {
    return res.status(INTERNAL_SERVER).json({ message: "error" });
  }
};

const extendToken = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      return res.status(UNAUTHORIZED).json({ message: "Token not found" });
    }

    const checkRefreshToken = await models.users.findOne({
      where: { refresh_token: refreshToken },
    });
    if (!checkRefreshToken) {
      return res.status(UNAUTHORIZED).json({ message: "User not found" });
    }

    // const accessToken = createAccessToken({
    //   userId: checkRefreshToken.user_id,
    // });
    const accessToken = createAccessTokenAsyncKey({
      userId: checkRefreshToken.user_id,
    });
    return res
      .status(OK)
      .json({ message: "Token extended", data: accessToken });
  } catch (error) {
    return res.status(INTERNAL_SERVER).json({ message: "error" });
  }
};

const loginAsyncKey = async (req, res) => {
  try {
    const { email, pass } = req.body;

    const user = await models.users.findOne({
      where: { email },
    });
    if (!user) {
      return res.status(BAD_REQUEST).json({ message: "User not found" });
    }

    const isMatch = bcrypt.compareSync(pass, user.pass_word);
    if (!isMatch) {
      return res.status(BAD_REQUEST).json({ message: "Incorrect password" });
    }

    const accessToken = createAccessTokenAsyncKey({ userId: user.user_id });
    const refreshToken = createRefreshTokenAsyncKey({ userId: user.user_id });
    await models.users.update(
      {
        refresh_token: refreshToken,
      },
      {
        where: { user_id: user.user_id },
      },
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(OK).json({
      message: "Login succesfully",
      data: accessToken,
    });
  } catch (error) {
    return res.status(INTERNAL_SERVER).json({ message: "error" });
  }
};

export { register, login, loginWithFacebook, extendToken, loginAsyncKey };
