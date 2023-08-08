const { Router } = require('express');
const workerAuthController = require('../controllers/workerAuthController');
const router = Router();

router.get('/:worker_id', workerAuthController.getPasswordHash);
router.post('/', workerAuthController.addWorkerAuth);

module.exports = router;