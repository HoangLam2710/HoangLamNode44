import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "localhost", // địa chỉ host của MySQL dưới local
  user: "root", // tên user đăng nhập vào MySQL
  password: "123456", // password để đăng nhập vào MySQL
  database: "node44", // tên database muốn truy cập
  port: 3306, // port của MySQL
});

export default pool;
