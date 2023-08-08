const getRangeDays = `
    SELECT 
    MIN(day_date) as minDate, 
    MAX(day_date) as maxDate
    FROM 
    (
        SELECT 
            day_date, 
            COUNT(*) as num_entries
        FROM 
            pneumiot.hourly_average
        WHERE 
            sensor_id in (SELECT pneumiot.board.sensor_id 
                FROM pneumiot.board 
                INNER JOIN pneumiot.patient 
                ON pneumiot.patient.board_id = pneumiot.board.board_id 
                WHERE pneumiot.patient.patient_id = $1 LIMIT 1)
            AND pneumiot.hourly_average.board_id = $2 
        GROUP BY 
            day_date
    ) as entry_counts
    WHERE 
    num_entries = 24`;

const getSensorTypesByPatientIdAndDate = `
    SELECT pneumiot.sensor.sensor_type, pneumiot.sensor.sensor_id 
    FROM pneumiot.sensor 
    WHERE pneumiot.sensor.sensor_id IN (
        SELECT pneumiot.hourly_average.sensor_id
        FROM pneumiot.hourly_average 
        WHERE patient_id = $1 
            AND day_date = $2
            AND pneumiot.hourly_average.board_id = $3
  )`;

const getAverageDataByPatientIdDateAndSensorId = `
    SELECT average_measure as average, hour_time as data_time
    FROM pneumiot.hourly_average 
    WHERE sensor_id = $1 
        AND patient_id = $2 
        AND day_date = $3
        AND pneumiot.hourly_average.board_id = $4`;

module.exports = {
    getRangeDays,
    getSensorTypesByPatientIdAndDate,
    getAverageDataByPatientIdDateAndSensorId,
};