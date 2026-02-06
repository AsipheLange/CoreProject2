
import mysql from "mysql2/promise";

export const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "tripleJ03*",
  database: "employee_data"
});
