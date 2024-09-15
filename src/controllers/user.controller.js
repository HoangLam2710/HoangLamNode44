import pool from "../../db.js";
import { INTERNAL_SERVER, OK } from "../../const.js";

const createUser = (req, res) => {
  let { params, body } = req;
  let { id } = params;
  res.send({ id, ...body });
};

const getUsers = async (req, res) => {
  try {
    const [data] = await pool.query("SELECT * FROM users");
    res.status(OK).json(data);
  } catch (error) {
    res.status(INTERNAL_SERVER).json({ message: "error" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { user_id } = req.params;
    const [data] = await pool.query(`
      DELETE FROM users 
      WHERE user_id = ${user_id}
    `);
    res.status(OK).json(data);
  } catch (error) {
    res.status(INTERNAL_SERVER).json({ message: "error" });
  }
};

export { createUser, getUsers, deleteUser };
