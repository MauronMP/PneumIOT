const getAllBoardPatient = `
    Select DISTINCT(pneumiot.board.board_id), pneumiot.patient.patient_id 
    FROM pneumiot.board 
    inner JOIN pneumiot.patient 
    ON pneumiot.board.board_id = pneumiot.patient.board_id`;

module.exports = {
    getAllBoardPatient,
};