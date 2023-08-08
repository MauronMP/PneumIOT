const getAllBoards = `
    SELECT pneumiot.board.board_id, array_agg(pneumiot.sensor.sensor_type) as sensor_types
    FROM pneumiot.board
    JOIN pneumiot.sensor 
    ON pneumiot.board.sensor_id = pneumiot.sensor.sensor_id 
    GROUP BY pneumiot.board.board_id`;

const getBoardByBoardId = "SELECT * FROM pneumiot.board WHERE board_id = $1";

const addBoard = `INSERT INTO pneumiot.board(board_id, sensor_id) VALUES ($1,$2)`;

const removeBoard = `DELETE FROM pneumiot.board WHERE pneumiot.board.board_id = $1`;

const getBoardBySensorId = "SELECT * FROM pneumiot.board WHERE board_id = $1 and sensor_id = $2";

const getBoardsByWorkerId = `
    SELECT pneumiot.board.board_id, array_agg(pneumiot.sensor.sensor_type) as sensor_types
    FROM pneumiot.board 
    INNER JOIN pneumiot.sensor ON pneumiot.board.sensor_id = pneumiot.sensor.sensor_id
    WHERE pneumiot.board.board_id IN (
        SELECT pneumiot.board.board_id
        FROM pneumiot.board
        INNER JOIN pneumiot.patient ON pneumiot.board.board_id = pneumiot.patient.board_id
        WHERE pneumiot.patient.patient_id IN (
            SELECT pneumiot.patient.patient_id
            FROM pneumiot.patient 
            JOIN pneumiot.doctor 
            ON pneumiot.doctor.patient_id = pneumiot.patient.patient_id 
            WHERE pneumiot.doctor.worker_id = $1
        )
    )
    GROUP BY pneumiot.board.board_id`;

const getSensorTypes = "select sensor_id, sensor_type FROM pneumiot.sensor";

const getSensorTypesGivenBoardId = `
    SELECT pneumiot.sensor.sensor_type FROM pneumiot.sensor 
    JOIN pneumiot.board 
    ON pneumiot.board.sensor_id = pneumiot.sensor.sensor_id 
    WHERE pneumiot.board.board_id = $1`;


const getWorkerByBoardID = `
    SELECT pneumiot.doctor.worker_id FROM pneumiot.doctor
    INNER JOIN pneumiOT.patient ON pneumiot.doctor.patient_id = pneumiot.patient.patient_id
    WHERE pneumiot.patient.patient_id IN (
        SELECT pneumiot.patient.patient_id FROM pneumiot.board
        JOIN pneumiot.patient
        ON pneumiot.board.board_id = pneumiot.patient.board_id
        WHERE pneumiot.board.board_id = $1
    )`;

const getAllBoardsBySensorId = `SELECT board_id FROM pneumiot.board WHERE sensor_id = $1`;

module.exports = {
    getAllBoards,
    getBoardByBoardId,
    addBoard,
    removeBoard,
    getBoardBySensorId,
    getBoardsByWorkerId,
    getSensorTypes,
    getSensorTypesGivenBoardId,
    getWorkerByBoardID,
    getAllBoardsBySensorId,
};