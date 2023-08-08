const { Router } = require('express');
const dailyController = require('../controllers/dailyController');
const router = Router();

router.get('/dateRange/:patient_id/:board_id', dailyController.dateRange);
router.get('/sensor/type/:patient_id/:day_date/:board_id', dailyController.getSensorTypesByPatientIdAndDate);
router.get('/average/:sensor_id/:patient_id/:day_date/:board_id', dailyController.getAverageDataByPatientIdDateAndSensorId);

module.exports = router;