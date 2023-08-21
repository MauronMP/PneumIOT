const pool = require("../../db");
const boardQueries = require("../queries/boardQueries");
const sensorQueries = require("../queries/sensorQueries");
const doctorQueries = require("../queries/doctorQueries");
const patientQueries = require("../queries/patientQueries");
const logQueries = require('../queries/logQueries');

const EMPTY_ARRAY = 0;

/**
 * 
 * Returns all the boards in the database
 * 
 */
const getAllBoards = (req, res) => {

    pool.query(boardQueries.getAllBoards, (error, results) => {
        if (error) {
            const log_message = `Error getting all boards at ${new Date()}`;
            pool.query(logQueries.errorLog, [log_message], (error, results) => {});
        }
        if (results.rows.length !== EMPTY_ARRAY) {
            res.status(200).json(results.rows);
        } else {
            res.status(400).json({ error: "There are not boards yet!" });
        }
    });
};

/**
 * 
 * Returns all the boards associated to a worker by worker_id
 *   
 */
const getBoardsByWorkerId = (req, res) => {

    const worker_id = req.params.worker_id;

    pool.query(boardQueries.getBoardsByWorkerId, [worker_id], (error, results) => {
        if (error) {
            const log_message = `There was an error getting the boards by its worker_id: ${worker_id} at ${new Date()}`;
            pool.query(logQueries.errorLog, [log_message], (error, results) => {});
        }
        if (results.rows.length !== EMPTY_ARRAY) {
            const log_message = `Worker with worker_id: ${worker_id} got all boards at ${new Date()}`;
            pool.query(logQueries.workerLog, [worker_id, log_message], (error, results) => {});
            res.status(200).json(results.rows);
        }
    });
};

/**
 * 
 * Returns all the boards associated to a sensor by sensor_id
 * 
 */
async function checkBoardIdExists(board_id) {
    try {
        const results = await pool.query(boardQueries.getBoardByBoardId, [board_id]);
        return results.rows.length !== EMPTY_ARRAY;
    } catch (error) {
        throw error;
    }
}


/**
 * 
 * Returns all data information of a board by its board_id
 * 
 */
const getBoardByBoardId = (req, res) => {

    const board_id = req.params.board_id;

    pool.query(boardQueries.getBoardByBoardId, [board_id], (error, results) => {
        if (error) {
            const log_message = `There was an error getting the board by its board_id: ${board_id} at ${new Date()}`;
            pool.query(logQueries.errorLog, [log_message], (error, results) => {});
        }
        if (results.rows.length !== EMPTY_ARRAY) {
            res.status(200).json(results.rows);
        } else {
            res.status(400).json({ error: "No board exists with this ID!" });
        }
    });
};

/**
 * 
 * Add a new board to the database if: 
 *  - board_id is not already in the database
 *  - sensor_id exists in the database
 * 
 */
const addBoard = (req, res) => {

    const { board_id, sensor_id } = req.body;

    if (board_id && sensor_id) {
        pool.query(boardQueries.getBoardBySensorId, [board_id, sensor_id], (error, results) => {
            if (results.rows.length === EMPTY_ARRAY) {
                pool.query(sensorQueries.getSensorById, [sensor_id], (error, results) => {
                    if (results.rows.length !== EMPTY_ARRAY) {
                        pool.query(boardQueries.addBoard, [board_id, sensor_id], (error, results) => {
                            if (error) {
                                const log_message = `There was an error adding the board with board_id: ${board_id} at ${new Date()}`;
                                pool.query(logQueries.errorLog, [log_message], (error, results) => {});
                            }
                            const log_message = `Board data with board_id: ${board_id} and sensor_id: ${sensor_id} added successfully at ${new Date()}`;
                            pool.query(logQueries.sensorLog, [board_id,sensor_id,log_message], (error, results) => {});
                            res.status(200).json({ message: "Board data added successfully" });
                        });
                    } else {
                        res.status(400).json({ error: "No sensor id exists" });
                    }
                });
            } else {
                res.status(400).json({ error: "Board id exists with this sensor" });
            }
        });
    } else {
        res.status(400).json({ error: "There are some empty data!" });
    }
};


/**
 * 
 * Remove a board from the database if:
 * - board_id exists in the database
 * - worker_id exists in the database
 * - board_id is associated to worker_id
 * Also, after deleting the board, all the patients associated to the board are deleted.
 * 
 */
const removeBoard = (req, res) => {

    const { board_id, worker_id } = req.body;

    pool.query(boardQueries.getBoardByBoardId, [board_id], (error, results) => {
        if (error) {
            const log_message = `There was an error getting the board by its board_id: ${board_id} at ${new Date()}`;
            pool.query(logQueries.errorLog, [log_message], (error, results) => {});
        }
        if (results.rows.length) {
            pool.query(doctorQueries.getDoctorByWorkerId, [worker_id], (error, results) => {
                if (results.rows.length !== EMPTY_ARRAY) {
                    pool.query(boardQueries.removeBoard, [board_id], (error, results) => {
                        if (error) {
                            const log_message = `There was an error removing the board with board_id: ${board_id} at ${new Date()}`;
                            pool.query(logQueries.errorLog, [log_message], (error, results) => {});
                        }
                        pool.query(patientQueries.deletePatientsByBoardId, [board_id], (error, results) => {
                            if (error) {
                                const log_message = `There was an error removing the patients with board_id: ${board_id} at ${new Date()}`;
                                pool.query(logQueries.errorLog, [log_message], (error, results) => {});
                            }
                            pool.query(doctorQueries.deletePatientsGivenBoardId, [board_id], (error, results) => {
                                if (error) {
                                    const log_message = `There was an error removing the patients with board_id: ${board_id} associated to doctor at ${new Date()}`;
                                    pool.query(logQueries.errorLog, [log_message], (error, results) => {});
                                }
                                const log_message = `Worker with worker_id: ${worker_id} removed board with board_id: ${board_id} successfully at ${new Date()}`;
                                pool.query(logQueries.workerLog, [worker_id, log_message], (error, results) => {});
                                res.status(200).send("Board remove successfully");
                            });
                        });
                    });
                }
            });
        }
    });
};

/**
 * 
 * Remove a board from the database if:
 * - board_id exists in the database
 * - board_id is associated to a worker_id
 * It checks if the board_id is associated to a worker_id, if it is, it calls the removeBoard function. 
 * If not, it removes the board.
 * 
 */
const removeBoardAsAdmin = (req, res) => {

    const { board_id } = req.body;

    pool.query(boardQueries.getBoardByBoardId, [board_id], (error, results) => {
        if (error) {
            const log_message = `There was an error getting the board by its board_id: ${board_id} at ${new Date()}`;
            pool.query(logQueries.errorLog, [log_message], (error, results) => {});
        }
        if (results.rows.length) {
            pool.query(boardQueries.getWorkerByBoardID, [board_id], (error, results) => {
                if (error) {
                    const log_message = `There was an error getting the worker by its board_id: ${board_id} at ${new Date()}`;
                    pool.query(logQueries.errorLog, [log_message], (error, results) => {});
                }
                if (results.rows.length !== EMPTY_ARRAY) {
                    results.rows.forEach((worker) => {
                        const worker_id = worker.worker_id;
                        req.body = { board_id, worker_id };
                        removeBoard(req, res);
                    });
                } else {
                    pool.query(boardQueries.removeBoard, [board_id], (error, results) => {
                        if (error) {
                            const log_message = `There was an error removing the board with board_id: ${board_id} at ${new Date()}`;
                            pool.query(logQueries.errorLog, [log_message], (error, results) => {});
                        }
                        const log_message = `Board with board_id: ${board_id} removed successfully, with no worker associated ${worker_id} at ${new Date()}`;
                        pool.query(logQueries.workerLog, [worker_id, log_message], (error, results) => {});
                        res.status(200).json({ message: "Board removed successfully" });
                    });
                }
            });
        }
    });
};

/**
 * 
 * Returns all the data information of a board by its board_id
 * 
 */
const getAllDataByBoardId = async (req, res) => {

    try {

        const board_id = req.params.board_id;
        const existsBoard = await checkBoardIdExists(board_id);

        if (existsBoard) {
            pool.query(boardQueries.getAllDataByBoardId, [board_id], (error, results) => {
                if (error) {
                    const log_message = `There was an error getting all the data by board_id: ${board_id} at ${new Date()}`;
                    pool.query(logQueries.errorLog, [log_message], (error, results) => {});
                }
                if (results.rows.length !== EMPTY_ARRAY) {
                    res.status(200).json(results.rows);
                }
            });
        } else {
            res.status(400).json({ error: "No board exists with this ID!" });
        }
    } catch (error) {
        const log_message = `${error} at time ${new Date()}`;
        pool.query(logQueries.errorLog, [log_message], (error, results) => {});
    }
};

/**
 * 
 * Returns all the sensor types
 * 
 */
const getSensorTypes = (req, res) => {

    pool.query(boardQueries.getSensorTypes, (error, results) => {
        if (error) {
            const log_message = `There was an error getting all the sensor types at ${new Date()}`;
            pool.query(logQueries.errorLog, [log_message], (error, results) => {});
        }
        if (results.rows.length !== EMPTY_ARRAY) {
            res.status(200).json(results.rows);
        } else {
            res.status(400).json({ error: "There are no sensors yet!" });
        }
    });
};

// Export functions
module.exports = {
    getAllBoards,
    getBoardsByWorkerId,
    getBoardByBoardId,
    addBoard,
    removeBoard,
    getAllDataByBoardId,
    getSensorTypes,
    removeBoardAsAdmin,
};