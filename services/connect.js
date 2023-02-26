import mysql from "mysql";
import dotenv from 'dotenv';

dotenv.config();

export const conn = mysql.createConnection({
    // charset: 'utf8mb4',
    // debug: false,
    // multipleStatements: false,
    // connectionLimit: 10,
    // connectTimeout: 10000,

    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE
})