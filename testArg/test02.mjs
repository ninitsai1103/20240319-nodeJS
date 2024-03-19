// process.env.MY_NAME = "Ni";
// console.log(process.env);

import mysql from "mysql2/promise";
import dotenv from "dotenv";

// 讀取.env檔案
dotenv.config();

const connection = await mysql.createConnection({
    host: process.env.HOST,
    port: process.env.PORT,
    user: process.env.USERS,
    password: process.env.PASSWORD,
    database: process.env.DATABASE 
 });

// console.log(process.env.USER1);

const [rows] = await connection.execute('SELECT * FROM `sort`');

console.log(rows);