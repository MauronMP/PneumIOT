const { Router } = require('express');
const boardController = require('../controllers/boardController');
const workerController = require('../controllers/workerController');
const doctorController = require('../controllers/doctorController');

const router = Router();

router.get('/', boardController.getAllBoardPatient)

module.exports = router;