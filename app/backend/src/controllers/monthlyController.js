const pool = require('../../db');
const monthlyQueries = require('../queries/monthlyQueries');

/**
 * 
 * Gets the months with data for a given patient and board
 * 
 */
const getMonthsWithData = (req, res) => {

    const { patient_id, board_id } = req.params;

    pool.query(monthlyQueries.getMonthsWithData, [patient_id, board_id], (error, results) => {
        if (error) throw error;
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
        if (error) throw error;
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
            console.log(error)
        };
        res.status(200).json(results.rows);
    });
};

// Export the functions
module.exports = {
    getMonthsWithData,
    getSensorTypesByPatientIdAndDate,
    getAverageMonthDataByPatientIdSensorIdAndMonth,
};