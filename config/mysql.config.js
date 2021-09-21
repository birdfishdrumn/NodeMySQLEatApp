module.exports = {
    HOST: "127.0.0.1",
    PORT: process.env.MYSQL_PORT || "3307",
    USERNAME: process.env.MYSQL_USERNAME || "suzuka",
    PASSWORD: process.env.MYSQL_PASSWORD || "root",
    DATABASE: process.env.MYSQL_DATABASE || "tastylog",
};