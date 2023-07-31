const pool = require('../../db');
const workerAuthQueries = require('../queries/workerAuthQueries');
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);


//getPasswordHash
const getPasswordHash = (req, res) => {

    const worker_id = req.params.worker_id;
    pool.query(workerAuthQueries.getPasswordHash, [worker_id], (error, results) => {
        if (error) throw error;
        if(results.rows.length !== EMPTY_ARRAY) {
            res.status(200).json(results.rows);
        } else {
            res.status(200).json("");
        }
    });

}

//addWorker
const addWorkerAuth = ([worker_id, passwd_auth]) => {
    const hashedPassword = bcrypt.hashSync(passwd_auth, salt);
    pool.query(workerAuthQueries.addWorkerAuth, [worker_id, hashedPassword], (error, results) => {
        if (error) throw error;
        res.send(req.body);
    });
};


module.exports = {
    getPasswordHash,
    addWorkerAuth,
};
