require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const favicon = require("serve-favicon");
const PORT = process.env.PORT;
console.log(`listening Port ${PORT}`);
// ejsを使えるようにするcode
app.set("view engine", "ejs");

// 静的ファイルの読み込み
app.use(favicon(path.join(__dirname, "/public/favicon.ico")));
app.use("/public", express.static(path.join(__dirname, "/public")));

// routingファイルの取り込み
app.use("/", require("./routes/index.js"));

app.listen(PORT, () => {
    console.log(`listening ${PORT}`);
});