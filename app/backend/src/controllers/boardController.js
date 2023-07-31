const pool = require("../../db");
const boardQueries = require("../queries/boardQueries");
const patientQueries = require("../queries/patientQueries");
const EMPTY_ARRAY = 0;


const getAllBoards = (req, res) => {
    pool.query(boardQueries.getAllBoards, (error, results) => {
        if (error) throw error;
        if (results.rows.length !== EMPTY_ARRAY) {
            res.status(200).json(results.rows);
        } else {
            res.send("There are no boards yet");
        }
    });
};

async function checkBoardIdExists(board_id) {
    try {
        const results = await pool.query(boardQueries.getBoardByBoardId, [board_id]);
        return results.rows.length !== EMPTY_ARRAY;
    } catch (error) {
        throw error;
    }
}



const getBoardByBoardId = (req, res) => {

    const board_id = req.params.board_id;

    pool.query(boardQueries.getBoardByBoardId, [board_id], (error, results) => {
        if (error) throw error;
        if (results.rows.length !== EMPTY_ARRAY) {
            res.status(200).json(results.rows);
        } else {
            res.send("No board exists with this ID");
        }
    });
};

const addBoard = (req, res) => {

    const { board_id, pm_sensor, ozone_sensor, humidity_sensor, temperature_sensor, log_time } = req.body;

    if (board_id && pm_sensor && ozone_sensor && humidity_sensor && temperature_sensor && log_time) {
        pool.query(patientQueries.getPatientByBoardId, [board_id], (error, results) => {
            if (error) throw error;
            if (results.rows.length !== EMPTY_ARRAY) {
                pool.query(boardQueries.addBoard, [board_id, pm_sensor, ozone_sensor,
                    humidity_sensor, temperature_sensor, log_time], (error, results) => {
                        if (error) throw error;
                        res.status(201).send("Board data added successfully");
                    })
            } else {
                res.send("There are no patients with this board_id!")
            }
        });
    } else {
        res.status(201).send("There are some empty data!");
    }
};

const removeBoard = (req, res) => {

    const board_id = req.params.board_id;

    pool.query(boardQueries.getBoardByBoardId, [board_id], (error, results) => {
        if (error) throw error;
        if (!results.rows.length) {
            res.send("Board does not exists in the database");
        } else {
            pool.query(boardQueries.removeBoard, [board_id], (error, results) => {
                if (error) throw error;
                res.status(200).send("Board remove successfully");
            });
        }
    });
};

const getAllDataByBoardId = async (req, res) => {
    try {
        const board_id = req.params.board_id;

        const existsBoard = await checkBoardIdExists(board_id);

        if (existsBoard) {
            pool.query(boardQueries.getAllDataByBoardId, [board_id], (error, results) => {
                if (error) throw error;
                if (results.rows.length !== EMPTY_ARRAY) {
                    res.status(200).json(results.rows);
                }
            });
        } else {
            res.send("Board does not exists!")
        }
    } catch (error) {
        console.log("There was an error:", error);
    }
};

const getAllBoardPatient = (req, res) => {
    pool.query(boardQueries.getAllBoardPatient, (error, results) => {
        if (error) throw error;
        if (results.rows.length !== EMPTY_ARRAY) {
            res.status(200).json(results.rows);
        } else {
            res.send("There are no boards with patients yet");
        }
    });
};

module.exports = {
    getAllBoards,
    getBoardByBoardId,
    addBoard,
    removeBoard,
    getAllDataByBoardId,
    getAllBoardPatient,
};
