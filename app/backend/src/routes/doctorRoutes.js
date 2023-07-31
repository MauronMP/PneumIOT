const { Router } = require('express');
const doctorController = require('../controllers/doctorController');
const router = Router();

router.get('/', doctorController.getAllDoctorPatient);
router.get('/:worker_id', doctorController.getPatientsByDoctorId);
router.post('/', doctorController.addDoctorPatient);
router.delete('/:patient_id/:worker_id', doctorController.removeDoctorPatient);

module.exports = router;