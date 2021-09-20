require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const logger = require("./lib/log/logger.js");
const applicationLogger = require("./lib/log/applicatonlogger.js");
const accesslogger = require("./lib/log/accesslogger.js");
const favicon = require("serve-favicon");
const PORT = process.env.PORT;
console.log(`listening Port ${PORT}`);
// ejsを使えるようにするcode
app.set("view engine", "ejs");
app.disable("x-powered-by");
// 静的ファイルの読み込み
app.use(favicon(path.join(__dirname, "/public/favicon.ico")));
app.use("/public", express.static(path.join(__dirname, "/public")));
// accesslogの設定
app.use(accesslogger());

// routingファイルの取り込み
app.use("/", require("./routes/index.js"));

// set application log
app.use(applicationLogger());

const mysql = require("mysql2");
// app.use("/test", async(req, res, next) => {
//     const { promisify } = require("util");
//     // const path = require("path");
//     // const { sql } = require("@garafu/mysql-fileloader")({ root: path.join(__dirname, "./lib/database/sql") });
//     const config = require("./config/mysql.config.js");
//     const mysql = require("mysql2");
//     const con = mysql.createConnection({
//         host: config.HOST,
//         port: config.PORT,
//         user: config.USERNAME,
//         password: config.PASSWORD,
//         database: config.DATABASE
//     });
//     const client = {
//         connect: promisify(con.connect).bind(con),
//         query: promisify(con.query).bind(con),
//         end: promisify(con.end).bind(con)
//     };
//     // let data;

//     try {
//         await client.connect();
//         // data = await client.query(await sql("SELECT_SHOP_BASIC_BY_ID"));
//         console.log(client.query);
//     } catch (err) {
//         next(err);
//     } finally {
//         await client.end();
//     }

//     res.end("OK");
// });
const config = require("./config/mysql.config.js");



const connection = mysql.createConnection({
    host: config.HOST,
    port: config.PORT,
    user: config.USERNAME,
    password: config.PASSWORD,
    database: config.DATABASE
});

app.get("/test", (req, res) => {
    connection.query(
        "SELECT * FROM t_shop",
        (error, results) => {
            console.log(results);
            res.send("huuta");
        }
    );
});

app.listen(PORT, () => {
    logger.application.info(`listening ${PORT}`);
});
