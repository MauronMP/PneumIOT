const pool = require('../../db');
const workerQueries = require('../queries/workerQueries');
const workerAuthQueries = require('../queries/workerAuthQueries');
const EMPTY_ARRAY = 0;

/**
 * 
 * Gets all the workers in the database
 * 
 */
const getWorkers = (req, res) => {

    pool.query(workerQueries.getWorkers, (error, results) => {
        if (error) throw error;
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
        if (error) throw error;
        if (results.rows.length !== EMPTY_ARRAY) {
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
        if (error) throw error;
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
                reject(error);
            } else {
                resolve(results);
            }
        });
    });

    const query2 = new Promise((resolve, reject) => {
        pool.query(workerAuthQueries.addWorkerAuth, [worker_id, passwd_auth], (error, results) => {
            if (error) {
                reject(error);
            } else {
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
 * Removes a worker from the database.
 * Executes three queries asynchronously:
 *  - workerQueries.getWorkerById -> to check if the worker exists
 *  - workerQueries.removeWorker -> to remove the worker from the worker table
 *  - workerAuthQueries.removeWorkerAuth -> to remove the worker from the worker_auth table
 * 
 */
const removeWorker = (req, res) => {

    const worker_id = req.params.worker_id;

    // Promise to obtain the worker for his ID
    const getWorkerPromise = new Promise((resolve, reject) => {
        pool.query(workerQueries.getWorkerById, [worker_id], (error, results) => {
            if (error) {
                reject(error);
            } else {
                const noWorkerFound = !results.rows.length;
                if (noWorkerFound) {
                    reject(new Error("Worker does not exist in the database"));
                } else {
                    resolve();
                }
            }
        });
    });

    // Promise to eliminate worker
    const deleteWorkerPromise = new Promise((resolve, reject) => {
        pool.query(workerQueries.removeWorker, [worker_id], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve();
            }
        });
    });

    // Promise to eliminate worker authentication
    const deleteWorkerAuthPromise = new Promise((resolve, reject) => {
        pool.query(workerAuthQueries.deleteWorkerAuth, [worker_id], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve();
            }
        });
    });

    // Execute all promises and manage results
    Promise.all([getWorkerPromise, deleteWorkerPromise, deleteWorkerAuthPromise])
        .then(() => {
            res.status(200).send("Worker removed successfully");
        })
        .catch((error) => {
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
            throw error;
        } else {
            const workerData = results.rows[0];
            if (workerData && workerData.passwd_auth === passwd_auth) {
                res.status(200).json(workerData);
            } else {
                res.status(401).json({ error: 'Invalid credentials.' });
            }
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
};