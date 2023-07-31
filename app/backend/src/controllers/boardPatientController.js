const pool = require("../../db");
const boardQueries = require("../queries/boardQueries");
const patientQueries = require("../queries/patientQueries");
const doctorQueries = require("../queries/doctorQueries");


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
    getAllBoardPatient,
};
