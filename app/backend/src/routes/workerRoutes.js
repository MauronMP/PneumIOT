const { Router } = require('express');
const workerController = require('../controllers/workerController');
const router = Router();

router.get('/', workerController.getWorkers);
router.get('/:worker_id', workerController.getWorkerById);
router.get('/role/:worker_role', workerController.getWorkerByRole);
router.post('/', workerController.addWorker);
router.delete('/:worker_id', workerController.removeWorker);
router.get('/login/:worker_email/:passwd_auth', workerController.loginWorker);
router.put('/:worker_id', workerController.editWorker);

module.exports = router;