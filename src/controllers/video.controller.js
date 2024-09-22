import { INTERNAL_SERVER, OK } from "../../const.js";
import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";

const models = initModels(sequelize);

const getListVideo = async (req, res) => {
  try {
    const data = await models.video.findAll();
    return res.status(OK).json(data);
  } catch (error) {
    return res.status(INTERNAL_SERVER).json({ message: "error" });
  }
};

const getType = async (req, res) => {
  try {
    const data = await models.video_type.findAll();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: "error" });
  }
};

const getListVideoType = async (req, res) => {
  try {
    const { typeId } = req.params;
    const data = await models.video.findAll({
      where: {
        type_id: typeId,
      },
    });
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: "error" });
  }
};

const getVideoPage = async (req, res) => {
  try {
    let { page, size } = req.params;
    page = parseInt(page, 10);
    size = parseInt(size, 10);
    if (isNaN(page) || page <= 0) {
      return res.status(400).json({ message: "invalid page" });
    }
    if (isNaN(size) || size <= 0) {
      return res.status(400).json({ message: "invalid size" });
    }
    const data = await models.video.findAll({
      limit: size,
      offset: (page - 1) * size,
    });
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: "error" });
  }
};

export { getListVideo, getType, getListVideoType, getVideoPage };
