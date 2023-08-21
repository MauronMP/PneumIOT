const pool = require('../../db');
const yearlyQueries = require('../queries/yearlyQueries');
const logQueries = require('../queries/logQueries');

/**
 * 
 * Gets all years which have data for a specific patient and board
 * 
 */
const getYearsWithData = (req, res) => {

    const { patient_id, board_id } = req.params;

    pool.query(yearlyQueries.getYearsWithData, [patient_id, board_id]  ,(error, results) => {
        if (error) {
            const log_message = `There was an error getting the years with data for patient ${patient_id} and board ${board_id} at ${new Date()}`;
            pool.query(logQueries.errorLog, [log_message], (error, results));
        }
        res.status(200).json(results.rows);
    });
};

/**
 * 
 * Gets all sensor types for a specific patient, year and board
 * 
 */
const getSensorTypesByPatientIdAndDate = (req, res) => { 
    
    const { patient_id, year_date, board_id } = req.params;

    pool.query(yearlyQueries.getSensorTypesByPatientIdAndDate, [patient_id, year_date, board_id] ,(error, results) => {
        if (error) {
            const log_message = `There was an error getting the sensor types for patient ${patient_id}, board ${board_id} and year ${year_date} at ${new Date()}`;
            pool.query(logQueries.errorLog, [log_message], (error, results));
        }
        res.status(200).json(results.rows);
    });
};

/**
 * 
 * Gets all the average data for a specific patient, sensor, year and board
 * 
 */
const getAverageYearDataByPatientIdSensorIdAndMonth = (req, res) => { 
    
    const { sensor_id, patient_id, year_date, board_id } = req.params;

    pool.query(yearlyQueries.getAverageYearDataByPatientIdSensorIdAndMonth, [ sensor_id, patient_id, year_date, board_id ] ,(error, results) => {
        if (error) {
            const log_message = `There was an error getting the average year data for patient ${patient_id}, board ${board_id}, year ${year_date} and sensor ${sensor_id} at ${new Date()}`;
            pool.query(logQueries.errorLog, [log_message], (error, results));
        }
        res.status(200).json(results.rows);
    });
};

// Export all the functions
module.exports = {
    getYearsWithData,
    getSensorTypesByPatientIdAndDate,
    getAverageYearDataByPatientIdSensorIdAndMonth,
};