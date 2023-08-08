const { Router } = require('express');
const sensorController = require('../controllers/sensorController');
const router = Router();

router.get('/', sensorController.getAllSensors);
router.post('/', sensorController.addSensor);
router.delete('/:sensor_id', sensorController.removeSensor);

module.exports = router;