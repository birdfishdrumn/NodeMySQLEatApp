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

// Exports global method to view engine
app.use((req, res, next) => {
    res.locals.moment = require("moment");
    res.locals.padding = require("./lib/math/math.js").padding;
    next();
});

// 静的ファイルの読み込み
app.use(favicon(path.join(__dirname, "/public/favicon.ico")));
app.use("/public", express.static(path.join(__dirname, "/public")));
// accesslogの設定
app.use(accesslogger());

// routingファイルの取り込み
app.use("/", require("./routes/index.js"));

// set application log
app.use(applicationLogger());

const select = "SELECT * FROM t_shop WHERE id = ?";

app.use("/test", async(req, res, next) => {
    const { MYSQLClient } = require("./lib/client");
    let data;

    try {
        data = await MYSQLClient.executeQuery(await select, [3]);

        console.log(data);
    } catch (err) {
        next(err);
    }

    res.end("OK");
});

app.listen(PORT, () => {
    logger.application.info(`listening ${PORT}`);
});