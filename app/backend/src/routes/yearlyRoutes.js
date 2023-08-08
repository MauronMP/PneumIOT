const { Router } = require('express');
const yearlyController = require('../controllers/yearlyController');
const router = Router();

router.get('/dateRange/:patient_id/:board_id', yearlyController.getYearsWithData);
router.get('/sensor/type/:patient_id/:year_date/:board_id', yearlyController.getSensorTypesByPatientIdAndDate);
router.get('/average/:sensor_id/:patient_id/:year_date/:board_id', yearlyController.getAverageYearDataByPatientIdSensorIdAndMonth);

module.exports = router;