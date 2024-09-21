import { INTERNAL_SERVER, OK } from "../../const.js";
import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import { Op } from "sequelize"; // operators: LIKE, AND, OR, IN

const models = initModels(sequelize);

const getListVideo = async (req, res) => {
  try {
    const data = await models.video.findAll();
    return res.status(OK).json(data);
  } catch (error) {
    return res.status(INTERNAL_SERVER).json({ message: "error" });
  }
};

export { getListVideo };
