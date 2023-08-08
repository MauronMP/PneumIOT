const pool = require('../../db');
const workerAuthQueries = require('../queries/workerAuthQueries');
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);

/**
 * 
 * Gets the password hash of a worker
 * 
 */
const getPasswordHash = (req, res) => {

    const worker_id = req.params.worker_id;

    pool.query(workerAuthQueries.getPasswordHash, [worker_id], (error, results) => {
        if (error) throw error;
        if (results.rows.length !== EMPTY_ARRAY) {
            res.status(200).json(results.rows);
        } else {
            res.status(200).json("");
        }
    });

}

/**
 * 
 * Add a workerAuth, the password is hashed
 * 
 */
const addWorkerAuth = ([worker_id, passwd_auth]) => {

    const hashedPassword = bcrypt.hashSync(passwd_auth, salt);

    pool.query(workerAuthQueries.addWorkerAuth, [worker_id, hashedPassword], (error, results) => {
        if (error) throw error;
        res.send(req.body);
    });
};

// Exports all the functions
module.exports = {
    getPasswordHash,
    addWorkerAuth,
};