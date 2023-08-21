const pool = require('../../db');
const workerAuthQueries = require('../queries/workerAuthQueries');
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);
const logQueries = require('../queries/logQueries');

/**
 * 
 * Gets the password hash of a worker
 * 
 */
const getPasswordHash = (req, res) => {

    const worker_id = req.params.worker_id;

    pool.query(workerAuthQueries.getPasswordHash, [worker_id], (error, results) => {
        if (error) {
            const log_message = `There was an error getting the password hash for worker ${worker_id} at time ${new Date()}`;
            pool.query(logQueries.errorLog, [log_message], (error, results) => {});
        }
        if (results.rows.length !== EMPTY_ARRAY) {
            const log_message = `Worker ${worker_id} logged in at time ${new Date()}`;
            pool.query(logQueries.workerLog, [worker_id, log_message], (error, results) => {});
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
        if (error) {
            const log_message = `There was an error adding the workerAuth for worker ${worker_id} at time ${new Date()}`
            pool.query(logQueries.errorLog, [log_message], (error, results) => {});
        }
        const log_message = `Worker ${worker_id} added at time ${new Date()}`;
        pool.query(logQueries.workerLog, [worker_id, log_message], (error, results) => {});
        res.send(req.body);
    });
};

// Exports all the functions
module.exports = {
    getPasswordHash,
    addWorkerAuth,
};