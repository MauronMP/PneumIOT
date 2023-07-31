const getPatients = "SELECT * FROM pneumiot.patient";
const getPatientById = "SELECT * FROM pneumiot.patient WHERE patient_id = $1";
const checkBoardIdExists = "SELECT * FROM pneumiot.patient WHERE board_id = $1";
const addPatient = "INSERT INTO pneumiot.patient(board_id, patient_id, discharge_date, admission_date) VALUES ($1,$2,$3,$4)";
const removePatient = "DELETE FROM pneumiot.patient WHERE patient_id = $1";
const getPatientByBoardId = "SELECT patient_id FROM pneumiot.patient WHERE board_id = $1";

module.exports = {
    getPatients,
    getPatientById,
    checkBoardIdExists,
    addPatient,
    removePatient,
    getPatientByBoardId,
};