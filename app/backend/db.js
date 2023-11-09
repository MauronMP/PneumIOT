const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    //host: "database", 
    host: "localhost",
    database: "postgres",
    password: "postgres",
    port: 5432,
});

module.exports = pool;