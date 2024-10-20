import pool from "../../db.js";
import { INTERNAL_SERVER, OK, NOT_FOUND, CREATED } from "../../const.js";
import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import { Op } from "sequelize"; // operators: LIKE, AND, OR, IN
import { PrismaClient } from "@prisma/client";

const models = initModels(sequelize);

const prisma = new PrismaClient();

const createUser = async (req, res) => {
  // let { params, body } = req;
  // let { id } = params;
  // res.send({ id, ...body });

  try {
    const { full_name, email, pass_word } = req.body;
    // const newUser = await models.users.create({
    //   full_name,
    //   email,
    //   pass_word,
    // });
    const newUser = await prisma.users.create({
      data: {
        full_name,
        email,
        pass_word,
      },
    });
    return res.status(CREATED).json(newUser);
  } catch (error) {
    return res.status(INTERNAL_SERVER).json({ message: "error" });
  }
};

const getUsers = async (req, res) => {
  try {
    // const [data] = await pool.query("SELECT * FROM users");
    const { full_name = "" } = req.query;
    const data = await models.users.findAll({
      // where: {
      // full_name: "John Doe",
      // full_name: {
      //   [Op.like]: `%${full_name}%`,
      // },
      // },
      // attributes: ["full_name"],
      // include: [
      //   {
      //     model: models.video,
      //     as: "videos",
      //     attributes: ["video_name", "user_id"],
      //     required: true, // default là false - left join, true - inner join
      //     include: [
      //       {
      //         model: models.video_comment,
      //         as: "video_comments",
      //       },
      //     ],
      //   },
      // ],
    });
    return res.status(OK).json(data);
  } catch (error) {
    return res.status(INTERNAL_SERVER).json({ message: "error" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { user_id } = req.params;

    // const [data] = await pool.query(`
    //   DELETE FROM users
    //   WHERE user_id = ${user_id}
    // `);

    // const user = await models.users.findByPk(user_id);

    const user = await prisma.users.findFirst({
      where: { user_id: Number(user_id) },
    });

    if (!user) {
      return res.status(NOT_FOUND).json({ message: "User not found" });
    }

    // user.destroy();

    await prisma.users.delete({
      where: { user_id: Number(user_id) },
    });

    return res.status(OK).json({ message: "User deleted successfully!" });
  } catch (error) {
    return res.status(INTERNAL_SERVER).json({ message: "error" });
  }
};

const updateUser = async (req, res) => {
  try {
    const { user_id } = req.params;
    const { full_name, pass_word } = req.body;

    // sequelize
    // cách 1:
    // const user = await models.users.findByPk(user_id);
    // if (!user) {
    //   return res.status(NOT_FOUND).json({ message: "User not found" });
    // }

    // await models.users.update(
    //   { full_name, pass_word },
    //   {
    //     where: { user_id },
    //   },
    // );

    // cách 2:
    // const user = await models.users.findOne({
    //   where: { user_id },
    // });
    // if (!user) {
    //   return res.status(NOT_FOUND).json({ message: "User not found" });
    // }
    // user.full_name = full_name || user.full_name;
    // user.pass_word = pass_word || user.pass_word;
    // await user.save();

    // ----------------------------

    // prisma
    const user = await prisma.users.findFirst({
      where: {
        user_id: Number(user_id),
      },
    });

    if (!user) {
      return res.status(NOT_FOUND).json({ message: "User not found" });
    }

    await prisma.users.update({
      where: {
        user_id: Number(user_id),
      },
      data: {
        full_name,
        pass_word,
      },
    });

    return res.status(OK).json({ message: "User updated successfully!" });
  } catch (error) {
    return res.status(INTERNAL_SERVER).json({ message: "error" });
  }
};

const uploadAvatar = async (req, res) => {
  try {
    const file = req.file;
    const { userId } = req.body;

    // const user = await models.users.findByPk(userId);

    // if (!user) {
    //   return res.status(NOT_FOUND).json({ message: "User not found" });
    // }

    // user.avatar = file.filename;
    // await user.save();

    // prisma
    const user = await prisma.users.findFirst({
      where: {
        user_id: Number(userId),
      },
    });

    if (!user) {
      return res.status(NOT_FOUND).json({ message: "User not found" });
    }
    const avatarPath = `/public/imgs/${file.filename}`;
    await prisma.users.update({
      where: {
        user_id: Number(userId),
      },
      data: {
        avatar: avatarPath,
      },
    });

    return res
      .status(OK)
      .json({ message: "Upload avatar successfully!", data: avatarPath });
  } catch (error) {
    return res
      .status(INTERNAL_SERVER)
      .json({ message: "error api upload avatar" });
  }
};

const uploadAvatarCloud = async (req, res) => {
  try {
    const file = req.file;
    const { userId } = req.body;

    const user = await prisma.users.findFirst({
      where: {
        user_id: Number(userId),
      },
    });

    if (!user) {
      return res.status(NOT_FOUND).json({ message: "User not found" });
    }
    const avatarPath = file.path;
    await prisma.users.update({
      where: {
        user_id: Number(userId),
      },
      data: {
        avatar: avatarPath,
      },
    });

    return res
      .status(OK)
      .json({ message: "Upload avatar successfully!", data: avatarPath });
  } catch (error) {
    return res
      .status(INTERNAL_SERVER)
      .json({ message: "error api upload avatar" });
  }
};

export {
  createUser,
  getUsers,
  deleteUser,
  updateUser,
  uploadAvatar,
  uploadAvatarCloud,
};
