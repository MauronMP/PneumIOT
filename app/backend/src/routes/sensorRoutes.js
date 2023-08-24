const { Router } = require('express');
const sensorController = require('../controllers/sensorController');
const router = Router();

router.get('/', sensorController.getAllSensors);
router.post('/', sensorController.addSensor);
router.delete('/:sensor_id', sensorController.removeSensor);
router.get('/:sensor_id', sensorController.getSensorById);
router.put('/:sensor_id', sensorController.editSensor);

module.exports = router;