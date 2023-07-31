const pool = require('../../db');
const queries = require('../queries/patientQueries');
const doctorController = require('../controllers/doctorController');
const EMPTY_ARRAY = 0;


const getPatients = (req,res) => {
    pool.query(queries.getPatients, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

const getPatientById = (req,res) => {
    const patient_id = req.params.patient_id;
    pool.query(queries.getPatientById, [patient_id], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

const addPatient = (req, res) => {
    const { board_id, patient_id, discharge_date, admission_date } = req.body;
  
    pool.query(queries.checkBoardIdExists, [board_id], (error, results) => {
      if (error) {
        console.error("Error al verificar el board_id:", error);
        res.status(500).json({ message: "Error en el servidor" });
      } else {
        if (results.rows.length) {
          res.status(400).json({ message: "Board already exists" });
        } else {
          let admissionDate = admission_date;
  
          if (admissionDate === undefined) {
            admissionDate = null;
          }
  
          pool.query(
            queries.addPatient,
            [board_id, patient_id, discharge_date, admissionDate],
            (error, results) => {
              if (error) {
                console.error("Error al agregar el paciente:", error);
                res.status(500).json({ message: "Error en el servidor" });
              } else {
                console.log("Paciente agregado exitosamente");
                res.status(201).json({ message: "Patient added Successfully" });
  
                // Llamar a la función addDoctorPatient aquí
                doctorController.addDoctorPatient(req, res);
              }
            }
          );
        }
      }
    });
  };
  
  
  

const removePatient = (req,res) => {
    const patient_id = req.params.patient_id;

    pool.query(queries.getPatientById, [patient_id], (error, results) => {
        const noPatientFound = !results.rows.length;
        if(noPatientFound) {
            res.send("Patient does not exists in the database");
        }

        pool.query(queries.removePatient, [patient_id], (error,results) => {
            if (error) throw error;
            res.status(200).send("Patient remove successfully");
        });
    });
};

const getPatientByBoardId = (req,res) => {

    const board_id = req.params.board_id;

    pool.query(queries.getPatientByBoardId, [board_id], (error, results) => {
        if (error) throw error;
        if(results.rows.length !== EMPTY_ARRAY) {
            res.status(200).json(results.rows);
        } else {
            console.log('No Patient exists with this board_id');
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