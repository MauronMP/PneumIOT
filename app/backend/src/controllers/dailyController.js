const pool = require('../../db');
const dailyQueries = require('../queries/dailyQueries');
const logQueries = require('../queries/logQueries');

/**
 * 
 * Returns the minimum and maximum dates for which there is data for a given patient and board
 * 
 */
const dateRange = (req, res) => {

    const { patient_id, board_id } = req.params;

    pool.query(dailyQueries.getRangeDays, [patient_id, board_id], (error, results) => {
        if (error) {
            const log_message = `Error getting date range for patient_id: ${patient_id} and board_id: ${board_id} at ${new Date()}`;
            pool.query(logQueries.errorLog, [log_message], (error, results));
        }

        // Format dates before sending the response
        const formattedResults = results.rows.map((row) => {
            // Parse dates from the database
            const minDate = new Date(row.mindate);
            const maxDate = new Date(row.maxdate);

            // Format dates to get only the date part in 'YYYYY-MM-DD' format
            const formattedMinDate = minDate.toISOString().split('T')[0];
            const formattedMaxDate = maxDate.toISOString().split('T')[0];

            // Return an object with formatted dates in place of the original result
            return {
                mindate: formattedMinDate,
                maxdate: formattedMaxDate,
            };
        });

        res.status(200).json(formattedResults);
    });
};


/**
 * 
 * Returns the sensor types for which there is data for a given patient, date and board_id
 * 
 */
const getSensorTypesByPatientIdAndDate = (req, res) => {

    const { patient_id, day_date, board_id } = req.params;

    pool.query(dailyQueries.getSensorTypesByPatientIdAndDate, [patient_id, day_date, board_id], (error, results) => {
        if (error) {
            const log_message = `Error getting sensor types for patient_id: ${patient_id}, day_date: ${day_date} and board_id: ${board_id} at ${new Date()}`;
            pool.query(logQueries.errorLog, [log_message], (error, results));
        }
        res.status(200).json(results.rows);
    });
};

/**
 * 
 * Returns the average data for a given patient, date, sensor and board_id
 * 
 */
const getAverageDataByPatientIdDateAndSensorId = (req, res) => {

    const { sensor_id, patient_id, day_date, board_id } = req.params;

    pool.query(dailyQueries.getAverageDataByPatientIdDateAndSensorId, [sensor_id, patient_id, day_date, board_id], (error, results) => {
        if (error) {
            const log_message = `Error getting average data for patient_id: ${patient_id}, day_date: ${day_date}, sensor_id: ${sensor_id} and board_id: ${board_id} at ${new Date()}`;
            pool.query(logQueries.errorLog, [log_message], (error, results));
        }
        res.status(200).json(results.rows);
    });
};

// Export the functions
module.exports = {
    dateRange,
    getSensorTypesByPatientIdAndDate,
    getAverageDataByPatientIdDateAndSensorId,
};