const getAverageYearDataByPatientIdSensorIdAndMonth = `
    SELECT average_measure as average, month_number as data_time
    FROM pneumiot.monthly_average 
    WHERE sensor_id = $1 
        AND patient_id = $2
        AND year_date = $3
        AND board_id = $4`;

const getYearsWithData = `
    SELECT year_date
    FROM pneumiot.monthly_average 
    WHERE patient_id = $1 and board_id= $2
    GROUP BY 
        year_date
    HAVING COUNT(DISTINCT month_number) > 0`;

const getSensorTypesByPatientIdAndDate = `
    SELECT pneumiot.sensor.sensor_type, pneumiot.sensor.sensor_id 
    FROM pneumiot.sensor where pneumiot.sensor.sensor_id IN (
        SELECT pneumiot.monthly_average.sensor_id
        FROM pneumiot.monthly_average 
        WHERE patient_id = $1
        AND year_date = $2
        AND board_id = $3
  )`;


module.exports = {
    getAverageYearDataByPatientIdSensorIdAndMonth,
    getSensorTypesByPatientIdAndDate,
    getYearsWithData,
};