const pool = require("./pool");

const MYSQLClient = {
    executeQuery: async function (query, values) {
        let results = await pool.executeQuery(query, values);
        return results;
    },
};

module.exports = {
    MYSQLClient,
};
