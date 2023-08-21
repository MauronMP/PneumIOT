
const pool = require('../../db');
const sensorQueries = require('../queries/sensorQueries');
const boardQueries = require('../queries/boardQueries');
const patientQueries = require('../queries/patientQueries');
const doctorQueries = require('../queries/doctorQueries');
const logQueries = require('../queries/logQueries');

/**
 * 
 * Get all sensors from the database.
 * 
 */
const getAllSensors = (req, res) => {
    pool.query(sensorQueries.getAllSensors, (error, results) => {
        if (error) {
            const log_message = `There was an error getting all sensors at time ${new Date()}`;
            pool.query(logQueries.errorLog, [log_message], (error, results));
        }
        res.status(200).json(results.rows);
    });
};

/**
 * 
 * This function adds a sensor to the database. it checks if the sensor id already exists.
 * 
 */
const addSensor = (req, res) => {

    const { sensor_id, sensor_type, sensor_units, min_value, max_value } = req.body;

    pool.query(sensorQueries.checkIfSensorIdExists, [sensor_id], (error, results) => {
        if (error) {
            const log_message = `There was an error checking if the sensor with id: ${sensor_id} exists at time ${new Date()}`;
            pool.query(logQueries.errorLog, [log_message], (error, results));
        }
        if (results.rows.length === 0) {
            pool.query(sensorQueries.addSensor, [sensor_id, sensor_type, sensor_units, min_value, max_value], (error, results) => {
                if (error) {
                    const log_message = `There was an error adding the sensor with id: ${sensor_id} at time ${new Date()}`;
                    pool.query(logQueries.errorLog, [log_message], (error, results));
                }
                res.status(200).json({ message: "Sensor added successfully" });
            });
        } else {
            res.status(400).json({ error: "This sensor id already exists!" });
        }
    });
};

/**
 * 
 * This function remove a sensor, but before that it removes:
 *  - all the boards asociated with the sensor
 *  - all patients which have a board associated with the sensor
 *  - all doctors which have a patient with a board associated with the sensor
 * 
 */
const removeSensor = async (req, res) => {

    const sensor_id = req.params.sensor_id;

    try {

        // Deletion of doctors who have a patient with a board associated with the sensor.
        const doctorsBySensorId = await pool.query(sensorQueries.getDoctorsBySensorId, [sensor_id]);

        if (doctorsBySensorId.rows.length > 1) {

            const worker_ids = doctorsBySensorId.rows.map((row) => row.worker_id);

            for (const worker_id of worker_ids) {
                await pool.query(doctorQueries.removeDoctorByWorkerId, [worker_id]);
            }
        } else if (doctorsBySensorId.rows.length === 1) {
            await pool.query(doctorQueries.removeDoctorByWorkerId, [doctorsBySensorId.rows[0].worker_id]);
        } else {
            res.status(400).json({ error: 'Error in the doctors query.' });
            return;
        }

        // Deletion of patients with a sensor-associated board
        const patientsByPatientId = await pool.query(sensorQueries.getPatientsBySensorId, [sensor_id]);

        if (patientsByPatientId.rows.length > 1) {
            for (const row of patientsByPatientId.rows) {
                await pool.query(patientQueries.removePatient, [row.patient_id]);
            }
        } else if (patientsByPatientId.rows.length === 1) {
            await pool.query(patientQueries.removePatient, [patientsByPatientId.rows[0].patient_id]);
        } else {
            res.status(400).json({ error: 'Error in patient consultation.' });
            return;
        }


        // Deletion of the boards associated with the sensor
        const boardsBySensorId = await pool.query(sensorQueries.getBoardsBySensorId, [sensor_id]);

        if (boardsBySensorId.rows.length > 1) {
            for (const row of boardsBySensorId.rows) {
                await pool.query(boardQueries.removeBoard, [row.board_id]);
            }
        } else if (boardsBySensorId.rows.length === 1) {
            await pool.query(boardQueries.removeBoard, [boardsBySensorId.rows[0].board_id]);
        } else {
            res.status(400).json({ error: 'Error in the boards query.' });
            return;
        }

        await pool.query(sensorQueries.removeSensor, [sensor_id]);

        res.status(200).json({ message: 'All eliminations were performed correctly.' });
    } catch (error) {
        res.status(500).json({ error: 'Error when deleting patients.' });
    }
};

// Export all methods
module.exports = {
    getAllSensors,
    addSensor,
    removeSensor,
};