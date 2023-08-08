const getAllDoctorPatient = "SELECT * FROM pneumiot.doctor";

const getPatientsByDoctorId = `
    SELECT  event_patient_id, pneumiot.doctor.patient_id, board_id, discharge_date, admission_date
    FROM pneumiot.patient
    INNER JOIN pneumiot.doctor
    ON pneumiot.patient.patient_id = pneumiot.doctor.patient_id
    WHERE pneumiot.doctor.worker_id = $1`;

const getAllPatientsByDoctorId = "SELECT * from pneumiot.doctor where worker_id = $1 and patient_id = $2";

const addDoctorPatient = "INSERT INTO pneumiot.doctor(patient_id, worker_id) VALUES ($1,$2)";

const removeDoctorPatient = "DELETE FROM pneumiot.doctor WHERE patient_id = $1 and worker_id = $2";

const getDoctorByWorkerId = "SELECT * FROM pneumiot.doctor where worker_id = $1";

const deletePatientsGivenBoardId = `
    DELETE FROM pneumiot.doctor
    WHERE pneumiot.doctor.patient_id IN (
        SELECT patient.patient_id
        FROM pneumiot.patient
        INNER JOIN pneumiot.board ON pneumiot.patient.board_id = pneumiot.board.board_id
        WHERE pneumiot.patient.board_id = $1
        GROUP BY patient.patient_id
    )`;

const removeDoctorByWorkerId = "DELETE FROM pneumiot.doctor WHERE worker_id = $1";

module.exports = {
    getAllDoctorPatient,
    getPatientsByDoctorId,
    getAllPatientsByDoctorId,
    addDoctorPatient,
    removeDoctorPatient,
    getDoctorByWorkerId,
    deletePatientsGivenBoardId,
    removeDoctorByWorkerId,
};