const pool = require('../../db');
const monthlyQueries = require('../queries/monthlyQueries');
const logQueries = require('../queries/logQueries');

/**
 * 
 * Gets the months with data for a given patient and board
 * 
 */
const getMonthsWithData = (req, res) => {

    const { patient_id, board_id } = req.params;

    pool.query(monthlyQueries.getMonthsWithData, [patient_id, board_id], (error, results) => {
        if (error) {
            const log_message = `Error getting months with data for patient ${patient_id} and board ${board_id} at ${new Date()}`;
            pool.query(logQueries.errorLog, [log_message], (error, results) => {});
        }
        res.status(200).json(results.rows);
    });
};


/**
 * 
 * Gets the sensor types for a given month, patient and board
 * 
 */
const getSensorTypesByPatientIdAndDate = (req, res) => {

    const { patient_id, month_id, board_id } = req.params;

    pool.query(monthlyQueries.getSensorTypesByPatientIdAndDate, [patient_id, month_id, board_id], (error, results) => {
        if (error) {
            const log_message = `Error getting sensor types for patient ${patient_id}, board ${board_id} and month ${month_id} at ${new Date()}`;
            pool.query(logQueries.errorLog, [log_message], (error, results) => {});
        }
        res.status(200).json(results.rows);
    });
};

/**
 * 
 * Gets the average data for a given month, sensor, patient and board
 * 
 */
const getAverageMonthDataByPatientIdSensorIdAndMonth = (req, res) => {

    const { sensor_id, patient_id, month_id, board_id } = req.params;

    pool.query(monthlyQueries.getAverageMonthDataByPatientIdSensorIdAndMonth, [sensor_id, patient_id, month_id, board_id], (error, results) => {
        if (error) {
            const log_message = `Error getting average month data for patient ${patient_id}, board ${board_id}, month ${month_id} and sensor ${sensor_id} at ${new Date()}`;
            pool.query(logQueries.errorLog, [log_message], (error, results) => {});
        }
        res.status(200).json(results.rows);
    });
};

// Export the functions
module.exports = {
    getMonthsWithData,
    getSensorTypesByPatientIdAndDate,
    getAverageMonthDataByPatientIdSensorIdAndMonth,
};