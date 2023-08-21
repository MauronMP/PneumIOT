const pool = require('../../db');
const logQueries = require('../queries/logQueries');

/**
 * 
 * Create a log for sensors given a board_id, sensor_id and log_message
 * 
 */
const sensorLog = (req, res) => {

    const { board_id, sensor_id, log_message } = req.body;

    pool.query(logQueries.sensorLog, [board_id, sensor_id, log_message]  ,(error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

/**
 * 
 * Create a log for workers given a worker_id and log_message
 * 
 */
const workerLog = (req, res) => {

    const { worker_id, log_message } = req.body;

    pool.query(logQueries.workerLog, [worker_id, log_message]  ,(error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};


/**
 * 
 * Create a log for errors given the log_message
 * 
 */
const errorLog = (req, res) => {

    const { log_message } = req.body;

    pool.query(logQueries.errorLog, [log_message]  ,(error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};



// Export all the functions
module.exports = {
    sensorLog,
    workerLog,
    errorLog,
};