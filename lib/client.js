const { promisify } = require("util");
const config = require("../config/mysql.config");
const mysql = require("mysql2");
const con = mysql.createConnection({
    host: config.HOST,
    port: config.PORT,
    user: config.USERNAME,
    password: config.PASSWORD,
    database: config.DATABASE,
});
const MYSQLClient = {
    connect: promisify(con.connect).bind(con),
    query: promisify(con.query).bind(con),
    end: promisify(con.end).bind(con),
};

module.exports = {
    MYSQLClient,
};