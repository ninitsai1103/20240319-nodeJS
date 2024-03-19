import mysql from "mysql2/promise";

const connection = await mysql.createPool({
  host: '127.0.0.1',
  port: 3306,
  user: 'admin',
  password: "12345",
  database: 'nodejs',
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0
});

export default connection;