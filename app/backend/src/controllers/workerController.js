const pool = require('../../db');
const workerQueries = require('../queries/workerQueries');
const doctorQueries = require('../queries/doctorQueries');
const workerAuthQueries = require('../queries/workerAuthQueries');
const logQueries = require('../queries/logQueries');
const EMPTY_ARRAY = 0;
const crypto = require('crypto');

/**
 * 
 * Gets all the workers in the database
 * 
 */
const getWorkers = (req, res) => {

    pool.query(workerQueries.getWorkers, (error, results) => {
        if (error) {
            const log_message = `Error getting all workers at ${new Date()}`;
            pool.query(logQueries.errorLog, [log_message], (error, results) => { });
        }
        if (results.rows.length !== EMPTY_ARRAY) {
            res.status(200).json(results.rows);
        } else {
            res.status(400).json({ error: "There are no workers already!" });
        }
    });
};

/**
 * 
 * Gets a worker by its worker_id
 * 
 */
const getWorkerById = (req, res) => {

    const worker_id = req.params.worker_id;

    pool.query(workerQueries.getWorkerById, [worker_id], (error, results) => {
        if (error) {
            const log_message = `There was an error getting the worker by its worker_id: ${worker_id} at ${new Date()}`;
            pool.query(logQueries.errorLog, [log_message], (error, results) => { });
        }
        if (results.rows.length !== EMPTY_ARRAY) {
            const log_message = `Getting a worker by its worker_id: ${worker_id} at ${new Date()}`;
            pool.query(logQueries.workerLog, [worker_id, log_message], (error, results) => { });
            res.status(200).json(results.rows);
        } else {
            res.status(400).json({ error: "No Worker exists with this ID!" });
        }
    });
};

/**
 * 
 * Gets all workers with a specific role
 * 
 */
const getWorkerByRole = (req, res) => {

    const worker_role = req.params.worker_role;

    pool.query(workerQueries.getWorkerByRole, [worker_role], (error, results) => {
        if (error) {
            const log_message = `There was an error getting the workers by its worker_role: ${worker_role} at ${new Date()}`;
            pool.query(logQueries.errorLog, [log_message], (error, results) => { });
        }
        if (results.rows.length !== EMPTY_ARRAY) {
            res.status(200).json(results.rows);
        } else {
            res.status(400).json({ error: "There are no workers with this role!" });
        }
    });
};

/**
 * 
 * Adds a new worker to the database.
 * Executes two queries asynchronously:
 *  - workerQueries.addWorker -> to add the worker to the worker table
 *  - workerAuthQueries.addWorkerAuth -> to add the worker to the worker_auth table
 * 
 */
const addWorker = (req, res) => {

    const { worker_id, worker_email, worker_name, worker_surname, worker_role, passwd_auth } = req.body;

    // Perform both queries asynchronously and return promises
    const query1 = new Promise((resolve, reject) => {
        pool.query(workerQueries.addWorker, [worker_id, worker_email, worker_name, worker_surname, worker_role], (error, results) => {
            if (error) {
                const log_message = `There was an error adding the worker with worker_id: ${worker_id} at ${new Date()}`;
                pool.query(logQueries.errorLog, [log_message], (error, results) => { });
                reject(error);
            } else {
                const log_message = `Added a new worker with worker_id: ${worker_id} at ${new Date()}`;
                pool.query(logQueries.workerLog, [worker_id, log_message], (error, results) => { });
                resolve(results);
            }
        });
    });

    const query2 = new Promise((resolve, reject) => {
        const hash = crypto.createHash('sha256');
        hash.update(passwd_auth);
        const hashedPassword = hash.digest('hex');

        pool.query(workerAuthQueries.addWorkerAuth, [worker_id, hashedPassword], (error, results) => {
            if (error) {
                const log_message = `There was an error adding the workerAuth with worker_id: ${worker_id} at ${new Date()}`;
                pool.query(logQueries.errorLog, [log_message], (error, results) => { });
                reject(error);
            } else {
                const log_message = `Added a new workerAuth with worker_id: ${worker_id} at ${new Date()}`;
                pool.query(logQueries.workerLog, [worker_id, log_message], (error, results) => { });
                resolve(results);
            }
        });
    });

    // Execute both queries and handle the results
    Promise.all([query1, query2])
        .then(() => {
            res.send(req.body);
        })
        .catch((error) => {
            res.status(500).send("Server error");
        });
};

/**
 * 
 * Removes a worker by its worker_id
 * Executes three queries asynchronously:
 * - workerQueries.getWorkerById -> to check if the worker exists in the database
 * - doctorQueries.removeDoctorByWorkerId -> to remove the worker as doctor
 * - workerQueries.removeWorker -> to remove the worker
 * 
 */
const removeWorker = (req, res) => {
    const worker_id = req.params.worker_id;

    const getWorkerPromise = new Promise((resolve, reject) => {
        pool.query(workerQueries.getWorkerById, [worker_id], (error, results) => {
            if (error) {
                // Log and handle error
                const log_message = `Error getting the worker by its worker_id: ${worker_id} at ${new Date()}`;
                pool.query(logQueries.errorLog, [log_message], (error, results) => { });
                reject(error);
            } else {
                const noWorkerFound = !results.rows.length;
                if (noWorkerFound) {
                    // Log and reject
                    const log_message = `Worker does not exist in the database: ${worker_id} at ${new Date()}`;
                    pool.query(logQueries.errorLog, [log_message], (error, results) => { });
                    reject(new Error("Worker does not exist in the database"));
                } else {
                    // Log and resolve
                    const log_message = `Promised to remove the worker by getting its worker_id: ${worker_id} at ${new Date()}`;
                    pool.query(logQueries.workerLog, [worker_id, log_message], (error, results) => { });
                    resolve();
                }
            }
        });
    });

    const checkIfDoctor = new Promise((resolve, reject) => {
        pool.query(workerQueries.getRoleByWorkerId, [worker_id], (error, results) => {
            if (error) {
                // Log and handle error
                const log_message = `Error checking if the worker with worker_id: ${worker_id} is a doctor at ${new Date()}`;
                pool.query(logQueries.errorLog, [log_message], (error, results) => { });
                reject(error);
            } else {
                // Log
                const log_message = `Promised to remove the worker as doctor with worker_id: ${worker_id} at ${new Date()}`;
                pool.query(logQueries.workerLog, [worker_id, log_message], (error, results) => { });

                // Delete from doctor table
                pool.query(doctorQueries.removeDoctorByWorkerId, [worker_id], (error, results) => {
                    if (error) {
                        // Log and reject
                        const log_message = `Error removing the worker as doctor with worker_id: ${worker_id} at ${new Date()}`;
                        pool.query(logQueries.errorLog, [log_message], (error, results) => { });
                        reject(error);
                    } else {
                        resolve();
                    }
                });
            }
        });
    });

    const deleteWorkerAuthPromise = new Promise((resolve, reject) => {
        pool.query(workerAuthQueries.deleteWorkerAuth, [worker_id], (error, results) => {
            if (error) {
                // Log and handle error
                const log_message = `Error removing the worker authentication with worker_id: ${worker_id} at ${new Date()}`;
                pool.query(logQueries.errorLog, [log_message], (error, results) => { });
                reject(error);
            } else {
                // Log and resolve
                const log_message = `Promised to remove the workerAuth with worker_id: ${worker_id} at ${new Date()}`;
                pool.query(logQueries.workerLog, [worker_id, log_message], (error, results) => { });
                resolve();
            }
        });
    });

    const deleteWorkerPromise = new Promise((resolve, reject) => {
        pool.query(workerQueries.removeWorker, [worker_id], (error, results) => {
            if (error) {
                // Log and handle error
                const log_message = `Error removing the worker with worker_id: ${worker_id} at ${new Date()}`;
                pool.query(logQueries.errorLog, [log_message], (error, results) => { });
                reject(error);
            } else {
                // Log and resolve
                const log_message = `Promised to remove the worker with worker_id: ${worker_id} at ${new Date()}`;
                pool.query(logQueries.workerLog, [worker_id, log_message], (error, results) => { });
                resolve();
            }
        });
    });

    getWorkerPromise
        .then(() => checkIfDoctor)
        .then(() => deleteWorkerAuthPromise)
        .then(() => deleteWorkerPromise)
        .then(() => {
            // Success response
            res.status(200).send("Worker removed successfully");
        })
        .catch((error) => {
            // Log and error response
            console.error("Error while removing worker:", error);
            const log_message = `Error removing worker with worker_id: ${worker_id} at ${new Date()}`;
            pool.query(logQueries.errorLog, [log_message], (error, results) => { });
            res.status(400).json({ error: "Server error" });
        });
};


/**
 * 
 * Checks if worker email and password are correct and returns the worker data.
 * if the worker does not exist, returns an empty array.
 * 
 */
const loginWorker = (req, res) => {

    const worker_email = req.params.worker_email;
    const passwd_auth = req.params.passwd_auth;

    pool.query(workerQueries.loginWorker, [worker_email], (error, results) => {
        if (error) {
            const log_message = `There was an error getting the worker by its worker_email: ${worker_email} at ${new Date()}`;
            pool.query(logQueries.errorLog, [log_message], (error, results) => { });
        } else {
            const workerData = results.rows[0];

            // Retrieve the stored hash from the database
            const storedHashedPassword = workerData.passwd_auth;

            // Calculate the hash of the password provided by the user
            const hash = crypto.createHash('sha256');
            hash.update(passwd_auth);
            const providedHashedPassword = hash.digest('hex');

            // Compare hashes to verify the password
            if (storedHashedPassword === providedHashedPassword) {
                res.status(200).json(results.rows);
            } else {
                res.status(200).json("");
            }
        }
    });
};


/**
 * 
 *  Edit a worker by its worker_id
 * 
 */
const editWorker = (req, res) => {

    const { worker_id, worker_email, worker_name, worker_surname, worker_role } = req.body;

    pool.query(workerQueries.getWorkerById, [worker_id], (error, results) => {
        if (error) {
            const log_message = `There was an error getting the worker by its worker_id: ${worker_id} at ${new Date()}`;
            pool.query(logQueries.errorLog, [log_message], (error, results) => { });
        }
        if (results.rows.length != 0) {
            pool.query(workerQueries.editWorker, [worker_id, worker_email, worker_name, worker_surname, worker_role], (error, results) => {
                if (error) {
                    const log_message = `There was an error editing the worker with worker_id: ${worker_id} at ${new Date()}`;
                    pool.query(logQueries.errorLog, [log_message], (error, results) => { });
                }
                res.status(200).json({ message: "Worker updated successfully" });
            });
        }
    });
};


// Export all methods
module.exports = {
    getWorkers,
    getWorkerById,
    getWorkerByRole,
    addWorker,
    removeWorker,
    loginWorker,
    editWorker,
};