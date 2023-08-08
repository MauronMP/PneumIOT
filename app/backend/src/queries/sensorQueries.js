const getSensorById = "SELECT * FROM pneumiot.sensor WHERE sensor_id = $1";

const getAllSensors = "SELECT * FROM pneumiot.sensor";

const checkIfSensorIdExists = "SELECT * FROM pneumiot.sensor WHERE sensor_id = $1";

const addSensor = `INSERT INTO pneumiot.sensor(sensor_id, sensor_type, sensor_units, min_value, max_value) VALUES ($1,$2,$3,$4,$5)`;

const getDoctorsBySensorId = `
  SELECT d.worker_id
  FROM pneumiot.doctor d
  INNER JOIN pneumiot.patient p ON d.patient_id = p.patient_id
  INNER JOIN pneumiot.board b ON p.board_id = b.board_id
  INNER JOIN pneumiot.sensor s ON b.sensor_id = s.sensor_id
  WHERE s.sensor_id = $1`;

const getPatientsBySensorId = `
  SELECT p.patient_id
  FROM pneumiot.patient p
  INNER JOIN pneumiot.board b ON p.board_id = b.board_id
  INNER JOIN pneumiot.sensor s ON b.sensor_id = s.sensor_id
  WHERE s.sensor_id = $1
  GROUP BY p.patient_id`;

const getBoardsBySensorId = `
  SELECT b.board_id
  FROM pneumiot.board b
  INNER JOIN pneumiot.sensor s ON b.sensor_id = s.sensor_id
  WHERE s.sensor_id = $1
  GROUP BY b.board_id;`;

const removeSensor = "DELETE FROM pneumiot.sensor WHERE sensor_id = $1";

module.exports = {
    getSensorById,
    getAllSensors,
    checkIfSensorIdExists,
    addSensor,
    removeSensor,
    getDoctorsBySensorId,
    getPatientsBySensorId,
    getBoardsBySensorId,
};