const pool = require('../../db');
const doctorQueries = require('../queries/doctorQueries');
const patientQueries = require('../queries/patientQueries');
const workerQueries = require('../queries/workerQueries');
const EMPTY_ARRAY = 0;

//getAllDoctorPatient
const getAllDoctorPatient = (req,res) => {
    pool.query(doctorQueries.getAllDoctorPatient, (error, results) => {
        if(error) throw error;
        if(results.rows.length !== EMPTY_ARRAY) {
            res.status(200).json(results.rows);
        } else {
            console.log('There are no doctors with patients already');
        }
    });  
};

const getPatientsByDoctorId = (req,res) => {
    
    const worker_id = req.params.worker_id;

    pool.query(workerQueries.getWorkerById, [worker_id], (error, results) => {
        if (error) throw error;
        if(results.rows.length !== EMPTY_ARRAY) {
            pool.query(doctorQueries.getPatientsByDoctorId, [worker_id], (error, results) => {
                if (error) throw error;
                if(results.rows.length !== EMPTY_ARRAY) {
                    res.status(200).json(results.rows);
                } else {
                    console.log('No Doctor Patient exists with this ID');
                }
            });
        } else {
            console.log('No Doctor exists with this ID');
        }
    });
}

//addDoctorPatient
const addDoctorPatient  = (req,res) => {
    const { patient_id, worker_id } = req.body;
    
    //check if worker_id exists
    pool.query(workerQueries.getWorkerById, [worker_id], (error, results) => {
        if(results.rows.length == EMPTY_ARRAY) {
            res.send("Worker does not exists!");
        } else {
            pool.query(patientQueries.getPatientById, [patient_id], (error, results) => {
                if(results.rows.length == EMPTY_ARRAY ) {
                    res.send("Patient does not exists!")
                } else {
                    pool.query(doctorQueries.getAllPatientsByDoctorId, [worker_id, patient_id], (error, results) => {
                        console.log(results.rows[0]);
                        if(results.rows.length == EMPTY_ARRAY) {
                            // add doctor-patient to db
                            pool.query(doctorQueries.addDoctorPatient, [patient_id, worker_id], (error, results) => {
                                if (error) throw error;
                                res.status(201).send("Doctor-Patient added Successfully");
                            })
                        } else {
                            res.send("Doctor Patient relation already exists");
                        }
                    });
                }
            });
        }
    });
};


const removeDoctorPatient  = (req,res) => {
    
    const patient_id = req.params.patient_id;
    const worker_id = req.params.worker_id;
    
    //check if worker_id exists
    pool.query(workerQueries.getWorkerById, [worker_id], (error, results) => {
        if(results.rows.length == EMPTY_ARRAY) {
            res.send("Worker does not exists!");
        } else {
            pool.query(patientQueries.getPatientById, [patient_id], (error, results) => {
                if(results.rows.length == EMPTY_ARRAY ) {
                    patientNoExists = true;
                    res.send("Patient does not exists!")
                } else {
                    pool.query(doctorQueries.getPatientsByDoctorId, [worker_id], (error, results) => {
                        if(results.rows.length !== EMPTY_ARRAY) {
                            // add doctor-patient to db
                            pool.query(doctorQueries.removeDoctorPatient, [patient_id, worker_id], (error, results) => {
                                if (error) throw error;
                                res.status(201).send("Doctor-Patient removed successfully");
                            })
                        } else {
                            res.send("Doctor Patient relation does not exists");
                        }
                    });
                }
            });
        }
    });
};

module.exports = {
    getAllDoctorPatient,
    getPatientsByDoctorId,
    addDoctorPatient,
    removeDoctorPatient,
};
