const mysql = require('mysql2');

const host = "localhost";
const user = "root";
const pass = "root";
const db = "Projeto1";

const pool = mysql.createPool({
    connectionLimit: 100,
    host: host,
    user: user,
    password: pass,
    database: db,
    debug: false,
});

module.exports = pool;