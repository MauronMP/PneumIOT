const getAllBoards = "SELECT * FROM pneumiot.board";
const getBoardByBoardId = "SELECT * FROM pneumiot.board where board_id = $1";
const addBoard = `INSERT INTO pneumiot.board(board_id, pm_sensor, ozone_sensor, 
    humidity_sensor, temperature_sensor, 
    log_time) 
    VALUES ($1,$2,$3,$4,$5,$6)`;

const removeBoard = "DELETE FROM pneumiot.board WHERE board_id = $1";
const getAllDataByBoardId = `SELECT pm_sensor, ozone_sensor, 
    humidity_sensor, temperature_sensor, 
    log_time 
    FROM pneumiot.board  WHERE board_id = $1`;
const getAllBoardPatient = `
    Select DISTINCT(pneumiot.board.board_id), pneumiot.patient.patient_id 
    FROM pneumiot.board 
    inner JOIN pneumiot.patient 
    ON pneumiot.board.board_id = pneumiot.patient.board_id`;

module.exports = {
    getAllBoards,
    getBoardByBoardId,
    addBoard,
    removeBoard,
    getAllDataByBoardId,
    getAllBoardPatient,
};