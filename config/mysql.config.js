module.exports = {
    HOST: process.env.MYSQL_HOST || "127.0.0.1",
    PORT: process.env.MYSQL_PORT || "3307",
    USERNAME: process.env.MYSQL_USERNAME || "node",
    PASSWORD: process.env.MYSQL_PASSWORD || "root",
    DATABASE: process.env.MYSQL_DATABASE || "node_database"
};