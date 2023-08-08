const pool = require('../../db');
const yearlyQueries = require('../queries/yearlyQueries');

/**
 * 
 * Gets all years which have data for a specific patient and board
 * 
 */
const getYearsWithData = (req, res) => {

    const { patient_id, board_id } = req.params;

    pool.query(yearlyQueries.getYearsWithData, [patient_id, board_id]  ,(error, results) => {
        if (error) throw error;
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
        if (error) throw error;
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
            console.log(error)
        };
        res.status(200).json(results.rows);
    });
};

// Export all the functions
module.exports = {
    getYearsWithData,
    getSensorTypesByPatientIdAndDate,
    getAverageYearDataByPatientIdSensorIdAndMonth,
};