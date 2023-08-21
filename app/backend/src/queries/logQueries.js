const sensorLog = "INSERT INTO pneumiot.sensor_log(board_id, sensor_id, log_message) VALUES ($1,$2,$3)";

const workerLog = "INSERT INTO pneumiot.worker_log(worker_id, log_message) VALUES ($1,$2)";

const errorLog = "INSERT INTO pneumiot.error_log(log_message) VALUES ($1)";

module.exports = {
    sensorLog,
    workerLog,
    errorLog,
};