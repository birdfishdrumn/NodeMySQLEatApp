require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT;
console.log(`listening Port ${PORT}`);

app.get("/:id", (req, res) => {
    res.send("Hello World" + req.params.id);
});

app.listen(PORT, () => {
    console.log(`listening ${PORT}`);
});
