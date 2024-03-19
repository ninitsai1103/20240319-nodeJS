import mysql from "mysql2";

const connection = mysql.createConnection({
   host: "127.0.0.1",
   port: 3306,
   user: "admin",
   password: "12345",
   database: "nodejs" 
});

export default connection;