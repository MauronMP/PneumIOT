const pool = require("../../db");
const queries = require("../queries/patientQueries");
const logQueries = require('../queries/logQueries');
const doctorController = require("../controllers/doctorController");
const EMPTY_ARRAY = 0;

// Get all patients
const getPatients = (req, res) => {
    pool.query(queries.getPatients, (error, results) => {
        if (error) {
            const log_message = `There was an error getting all patients at ${new Date()}`;
            pool.query(logQueries.errorLog, [log_message], (error, results));
        }
        res.status(200).json(results.rows);
    });
};

// Get patient by id
const getPatientById = (req, res) => {

    const patient_id = req.params.patient_id;

    pool.query(queries.getPatientById, [patient_id], (error, results) => {
        if (error) {
            const log_message = `There was an error getting the patient by its patient_id: ${patient_id} at ${new Date()}`;
            pool.query(logQueries.errorLog, [log_message], (error, results));
        }
        res.status(200).json(results.rows);
    });
};


const addPatient = async (req, res) => {

    const { board_id, patient_id, discharge_date, admission_date } = req.body;

    try {
        const boardExists = await new Promise((resolve, reject) => {
            pool.query(queries.checkBoardIdExists, [board_id], (error, results) => {
                if (error) {
                    const log_message = `There was an error checking if the board_id exists: ${board_id} at ${new Date()}`;
                    pool.query(logQueries.errorLog, [log_message], (error, results));
                    reject("Error Server");
                } else {
                    resolve(results.rows.length > 0);
                }
            });
        });

        if (boardExists) {
            res.status(400).json({ message: "Board already exists" });
        } else {
            let admissionDate = admission_date;

            if (admissionDate === undefined) {
                admissionDate = null;
            }

            pool.query(
                queries.addPatient,
                [board_id, patient_id, discharge_date, admissionDate],
                async (error, results) => {
                    if (error) {
                        const log_message = `There was an error adding the patient: ${patient_id} at ${new Date()}`;
                        pool.query(logQueries.errorLog, [log_message], (error, results));
                        res.status(500).json({ message: "Server error" });
                    } else {
                        try {
                            await doctorController.addDoctorPatient(req, res);
                        } catch (error) {
                            const log_message = `There was an error adding the patient: ${patient_id} at ${new Date()}`;
                            pool.query(logQueries.errorLog, [log_message], (error, results));
                            res.status(500).json({ message: "Server error" });
                        }
                    }
                }
            );
        }
    } catch (error) {
        const log_message = `There was an error with the board_id: ${board_id} at ${new Date()}`;
        pool.query(logQueries.errorLog, [log_message], (error, results));
        res.status(500).json({ message: "Server error" });
    }
};


/**
 * 
 * Remove patient by id. 
 * It checks if the patient exists in the database
 * 
 */
const removePatient = (req, res) => {

    const patient_id = req.params.patient_id;

    pool.query(queries.getPatientById, [patient_id], (error, results) => {
        const noPatientFound = !results.rows.length;
        if (noPatientFound) {
            res.status(500).json({ message: "Patient does not exists" });
        }

        pool.query(queries.removePatient, [patient_id], (error, results) => {
            if (error) {
                const log_message = `There was an error removing the patient by its patient_id: ${patient_id} at ${new Date()}`;
                pool.query(logQueries.errorLog, [log_message], (error, results));
            }
            res.status(200).send("Patient remove successfully");
        });
    });
};

/**
 * 
 * Get patient by board_id.
 * It checks if the patient exists in the database
 * 
 */
const getPatientByBoardId = (req, res) => {

    const board_id = req.params.board_id;

    pool.query(queries.getPatientByBoardId, [board_id], (error, results) => {
        if (error) {
            const log_message = `There was an error getting the patient by its board_id: ${board_id} at ${new Date()}`;
            pool.query(logQueries.errorLog, [log_message], (error, results));
        }
        if (results.rows.length !== EMPTY_ARRAY) {
            res.status(200).json(results.rows);
        } else {
            res.status(500).json({ message: "No Patient exists with this board_id" });
        }
    });
};

module.exports = {
    getPatients,
    getPatientById,
    addPatient,
    removePatient,
    getPatientByBoardId,
};