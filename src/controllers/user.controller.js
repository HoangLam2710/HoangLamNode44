import pool from "../../db.js";
import { INTERNAL_SERVER, OK } from "../../const.js";
import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import { Op } from "sequelize"; // operators: LIKE, AND, OR, IN

const models = initModels(sequelize);

const createUser = async (req, res) => {
  // let { params, body } = req;
  // let { id } = params;
  // res.send({ id, ...body });

  try {
    const { full_name, email, pass_word } = req.body;
    const newUser = await models.users.create({
      full_name,
      email,
      pass_word,
    });
    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(INTERNAL_SERVER).json({ message: "error" });
  }
};

const getUsers = async (req, res) => {
  try {
    // const [data] = await pool.query("SELECT * FROM users");
    const { full_name = "" } = req.query;
    const data = await models.users.findAll({
      where: {
        // full_name: "John Doe",
        full_name: {
          [Op.like]: `%${full_name}%`,
        },
      },
      attributes: ["full_name"],
      include: [
        {
          model: models.video,
          as: "videos",
          attributes: ["video_name", "user_id"],
          required: true, // default là false - left join, true - inner join
          include: [
            {
              model: models.video_comment,
              as: "video_comments",
            },
          ],
        },
      ],
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
    const user = await models.users.findByPk(user_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.destroy();
    return res.status(OK).json({ message: "User deleted successfully!" });
  } catch (error) {
    return res.status(INTERNAL_SERVER).json({ message: "error" });
  }
};

const updateUser = async (req, res) => {
  try {
    const { user_id } = req.params;
    const { full_name, pass_word } = req.body;

    // const user = await models.users.findByPk(user_id);
    // if (!user) {
    //   return res.status(404).json({ message: "User not found" });
    // }

    // await models.users.update(
    //   { full_name, pass_word },
    //   {
    //     where: { user_id },
    //   },
    // );

    const user = await models.users.findOne({
      where: { user_id },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.full_name = full_name || user.full_name;
    user.pass_word = pass_word || user.pass_word;
    await user.save();

    return res.status(OK).json({ message: "User updated successfully!" });
  } catch (error) {
    return res.status(INTERNAL_SERVER).json({ message: "error" });
  }
};

export { createUser, getUsers, deleteUser, updateUser };
