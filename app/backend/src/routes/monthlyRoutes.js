const { Router } = require('express');
const monthlyController = require('../controllers/monthlyController');
const router = Router();

router.get('/dateRange/:patient_id/:board_id', monthlyController.getMonthsWithData);
router.get('/sensor/type/:patient_id/:month_id/:board_id', monthlyController.getSensorTypesByPatientIdAndDate);
router.get('/average/:sensor_id/:patient_id/:month_id/:board_id', monthlyController.getAverageMonthDataByPatientIdSensorIdAndMonth);

module.exports = router;