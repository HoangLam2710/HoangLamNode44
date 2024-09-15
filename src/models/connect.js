import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  "node44", // database name
  "root", // username
  "123456", // password
  {
    host: "localhost",
    port: 3306,
    dialect: "mysql",
  },
);

export default sequelize;
