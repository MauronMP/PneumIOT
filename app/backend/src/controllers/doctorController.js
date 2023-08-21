const pool = require('../../db');
const doctorQueries = require('../queries/doctorQueries');
const patientQueries = require('../queries/patientQueries');
const workerQueries = require('../queries/workerQueries');
const logQueries = require('../queries/logQueries');
const EMPTY_ARRAY = 0;

/**
 * 
 * Returns all the doctors-patients in the database
 * 
 */
const getAllDoctorPatient = (req, res) => {

    pool.query(doctorQueries.getAllDoctorPatient, (error, results) => {
        if (error) {
            const log_message = `Error getting all doctor-patient relations at ${new Date()}`;
            pool.query(logQueries.errorLog, [log_message], (error, results));
        }
        if (results.rows.length !== EMPTY_ARRAY) {
            res.status(200).json(results.rows);
        } else {
            res.status(400).json({ error: "There are no doctors with patients already!" });
        }
    });
};

/**
 * 
 * Returns all the patients associated to a doctor by its worker_id
 * 
 */
const getPatientsByDoctorId = (req, res) => {

    const worker_id = req.params.worker_id;

    pool.query(workerQueries.getWorkerById, [worker_id], (error, results) => {
        if (error) {
            const log_message = `There was an error getting the worker by its worker_id: ${worker_id} at ${new Date()}`;
            pool.query(logQueries.errorLog, [log_message], (error, results));
        }
        if (results.rows.length !== EMPTY_ARRAY) {
            pool.query(doctorQueries.getPatientsByDoctorId, [worker_id], (error, results) => {
                if (error) {
                    const log_message = `There was an error getting the patients by its worker_id: ${worker_id} at ${new Date()}`;
                    pool.query(logQueries.errorLog, [log_message], (error, results));
                }
                if (results.rows.length !== EMPTY_ARRAY) {
                    res.status(200).json(results.rows);
                }
            });
        } else {
            res.status(400).json({ error: "No Doctor exists with this ID!" });
        }
    });
}

/**
 * 
 * Add a doctor-patient relation if:
 *  - The doctor exists
 *  - The patient exists
 *  - The doctor-patient relation does not exist
 * 
 */
const addDoctorPatient = (req, res) => {

    const { patient_id, worker_id } = req.body;

    //check if worker_id exists
    pool.query(workerQueries.getWorkerById, [worker_id], (error, results) => {
        if (results.rows.length == EMPTY_ARRAY) {
            res.status(400).json({ error: "Worker does not exists!" });
        } else {
            pool.query(patientQueries.getPatientById, [patient_id], (error, results) => {
                if (results.rows.length == EMPTY_ARRAY) {
                    res.status(400).json({ error: "Patient does not exists!" });
                } else {
                    pool.query(doctorQueries.getAllPatientsByDoctorId, [worker_id, patient_id], (error, results) => {
                        console.log(results.rows[0]);
                        if (results.rows.length == EMPTY_ARRAY) {
                            // add doctor-patient to db
                            pool.query(doctorQueries.addDoctorPatient, [patient_id, worker_id], (error, results) => {
                                if (error) {
                                    const log_message = `There was an error adding the doctor-patient relation: ${patient_id} - ${worker_id} at ${new Date()}`;
                                    pool.query(logQueries.errorLog, [log_message], (error, results));
                                }
                                res.status(201).send("Doctor-Patient added Successfully");
                            })
                        } else {
                            res.status(400).json({ error: "Doctor Patient relation already exists!" });
                        }
                    });
                }
            });
        }
    });
};

/**
 * 
 * Remove a doctor-patient relation if:
 *  - The doctor exists
 *  - The patient exists
 *  - The doctor-patient relation exists
 * 
 */
const removeDoctorPatient = (req, res) => {

    const patient_id = req.params.patient_id;
    const worker_id = req.params.worker_id;

    //check if worker_id exists
    pool.query(workerQueries.getWorkerById, [worker_id], (error, results) => {
        if (results.rows.length == EMPTY_ARRAY) {
            res.status(400).json({ error: "Worker does not exists!" });
        } else {
            pool.query(patientQueries.getPatientById, [patient_id], (error, results) => {
                if (results.rows.length == EMPTY_ARRAY) {
                    patientNoExists = true;
                    res.status(400).json({ error: "Patient does not exists!" });
                } else {
                    pool.query(doctorQueries.getPatientsByDoctorId, [worker_id], (error, results) => {
                        if (results.rows.length !== EMPTY_ARRAY) {
                            // add doctor-patient to db
                            pool.query(doctorQueries.removeDoctorPatient, [patient_id, worker_id], (error, results) => {
                                if (error) {
                                    const log_message = `There was an error removing the doctor-patient relation: ${patient_id} - ${worker_id} at ${new Date()}`;
                                    pool.query(logQueries.errorLog, [log_message], (error, results));
                                }
                                res.status(201).send("Doctor-Patient removed successfully");
                            })
                        } else {
                            res.status(400).json({ error: "Doctor Patient relation does not exists!" });
                        }
                    });
                }
            });
        }
    });
};

// Export functions
module.exports = {
    getAllDoctorPatient,
    getPatientsByDoctorId,
    addDoctorPatient,
    removeDoctorPatient,
};
