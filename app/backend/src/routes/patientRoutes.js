const { Router } = require('express');
const controller = require('../controllers/patientController');
const router = Router();

router.get('/', controller.getPatients);
router.get('/:patient_id', controller.getPatientById);
router.post('/', controller.addPatient);
router.delete('/:patient_id', controller.removePatient);
router.get('/board/:board_id', controller.getPatientByBoardId);

module.exports = router;