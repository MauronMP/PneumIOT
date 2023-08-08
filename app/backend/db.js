const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    //host: "database", CONEXION DOCKER
    host: "localhost",
    database: "postgres",
    password: "root",
    port: 5432,
});

module.exports = pool;