import { INTERNAL_SERVER, OK } from "../../const.js";
import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";

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
      pass_word: pass,
    });

    return res
      .status(201)
      .json({ message: "Register succesfully", data: userNew });
  } catch (error) {
    return res.status(INTERNAL_SERVER).json({ message: "error" });
  }
};

export { register };
