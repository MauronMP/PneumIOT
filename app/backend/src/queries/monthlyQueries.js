const getAverageMonthDataByPatientIdSensorIdAndMonth = `
    SELECT average_measure as average, daily_day as data_time
    FROM pneumiot.daily_average 
    WHERE sensor_id = $1 
        AND patient_id = $2 
        AND month_id = $3
        AND board_id = $4`;

const getMonthsWithData = `
    SELECT 
        month_id
    FROM 
        pneumiot.daily_average
    WHERE patient_id = $1 AND board_id = $2
    GROUP BY 
        month_id
    HAVING 
        COUNT(DISTINCT daily_day) > 0`;

const getSensorTypesByPatientIdAndDate = `
    SELECT pneumiot.sensor.sensor_type, pneumiot.sensor.sensor_id 
    FROM pneumiot.sensor 
    WHERE pneumiot.sensor.sensor_id IN (
        SELECT pneumiot.daily_average.sensor_id
        FROM pneumiot.daily_average 
        WHERE patient_id = $1
            AND month_id = $2
            AND board_id = $3
  )`;


module.exports = {
    getAverageMonthDataByPatientIdSensorIdAndMonth,
    getSensorTypesByPatientIdAndDate,
    getMonthsWithData,
};