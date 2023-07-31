const getAllDoctorPatient = "SELECT * FROM pneumiot.doctor";
const getPatientsByDoctorId = `SELECT  pneumiot.doctor.patient_id, board_id, discharge_date, admission_date
FROM pneumiot.patient
INNER JOIN pneumiot.doctor
ON pneumiot.patient.patient_id = pneumiot.doctor.patient_id
WHERE pneumiot.doctor.worker_id = $1`;
const getAllPatientsByDoctorId = "SELECT * from pneumiot.doctor where worker_id = $1 and patient_id = $2";
const addDoctorPatient = "INSERT INTO pneumiot.doctor(patient_id, worker_id) VALUES ($1,$2)";
const removeDoctorPatient = "DELETE FROM pneumiot.doctor WHERE patient_id = $1 and worker_id = $2";

module.exports = {
    getAllDoctorPatient,
    getPatientsByDoctorId,
    getAllPatientsByDoctorId,
    addDoctorPatient,
    removeDoctorPatient,
};