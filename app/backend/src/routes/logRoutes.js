const { Router } = require('express');
const logController = require('../controllers/logController');
const router = Router();

router.post('/sensorLog', logController.sensorLog);
router.post('/workerLog', logController.workerLog);
router.post('/errorLog', logController.errorLog);

module.exports = router;