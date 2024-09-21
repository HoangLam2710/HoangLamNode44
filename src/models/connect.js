import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  "node44_youtube", // database name
  "root", // username
  "123456", // password
  {
    host: "localhost",
    port: 3306,
    dialect: "mysql",
  },
);

export default sequelize;

// db first
// yarn sequelize-auto -h localhost -d node44_youtube -u root -x 123456 -p 3306 --dialect mysql -o src/models -l esm
