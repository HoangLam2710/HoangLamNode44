import { Sequelize } from "sequelize";
import configDb from "../config/connect_db.js";

const sequelize = new Sequelize(
  configDb.database,
  configDb.user,
  configDb.pass,
  {
    host: configDb.host,
    port: configDb.port,
    dialect: configDb.dialect,
  },
);

export default sequelize;

// db first
// yarn sequelize-auto -h localhost -d node44_youtube -u root -x 123456 -p 3306 --dialect mysql -o src/models -l esm
