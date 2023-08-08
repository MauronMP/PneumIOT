const pool = require("../../db");
const queries = require("../queries/patientQueries");
const doctorController = require("../controllers/doctorController");
const EMPTY_ARRAY = 0;

// Get all patients
const getPatients = (req, res) => {
    pool.query(queries.getPatients, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

// Get patient by id
const getPatientById = (req, res) => {
    const patient_id = req.params.patient_id;

    pool.query(queries.getPatientById, [patient_id], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};


const addPatient = async (req, res) => {
    const { board_id, patient_id, discharge_date, admission_date } = req.body;

    try {
        const boardExists = await new Promise((resolve, reject) => {
            pool.query(queries.checkBoardIdExists, [board_id], (error, results) => {
                if (error) {
                    reject("Error en el servidor");
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
                        res.status(500).json({ message: "Error en el servidor" });
                    } else {
                        try {
                            await doctorController.addDoctorPatient(req, res);
                        } catch (error) {
                            res.status(500).json({ message: "Error en el servidor" });
                        }
                    }
                }
            );
        }
    } catch (error) {
        console.error("Error al verificar el board_id:", error);
        res.status(500).json({ message: "Error en el servidor" });
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
            if (error) throw error;
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
        if (error) throw error;
        if (results.rows.length !== EMPTY_ARRAY) {
            res.status(200).json(results.rows);
        } else {
            console.log("No Patient exists with this board_id");
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