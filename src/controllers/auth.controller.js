import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { INTERNAL_SERVER, OK } from "../../const.js";
import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import configDb from "../config/connect_db.js";

const models = initModels(sequelize);

const register = async (req, res) => {
  try {
    const { fullName, email, pass } = req.body;

    const userExist = await models.users.findOne({
      where: { email },
    });

    if (userExist) {
      return res
        .status(400)
        .json({ message: "User already exists", data: null });
    }

    const userNew = await models.users.create({
      full_name: fullName,
      email,
      pass_word: bcrypt.hashSync(pass, 10),
    });

    return res
      .status(201)
      .json({ message: "Register succesfully", data: userNew });
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
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = bcrypt.compareSync(pass, user.pass_word);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    // tạo token
    // sign(params1, params2, params3)
    // params1: tạo payload và lưu vào token
    // params2: key để tạo token
    // params3: setting timelife của token và thuật toán để tạo token
    const accessToken = jwt.sign({ userId: user.user_id }, configDb.jwtSecret, {
      algorithm: "HS256",
      expiresIn: "1d",
    });

    return res
      .status(OK)
      .json({ message: "Login succesfully", data: accessToken });
  } catch (error) {
    return res.status(INTERNAL_SERVER).json({ message: "error" });
  }
};

export { register, login };
