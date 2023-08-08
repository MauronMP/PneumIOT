const { Router } = require('express');
const boardController = require('../controllers/boardController');
const router = Router();

router.get('/', boardController.getAllBoards);
router.get('/:board_id', boardController.getBoardByBoardId);
router.post('/', boardController.addBoard);
router.delete('/:board_id', boardController.removeBoard);
router.get('/worker/:worker_id', boardController.getBoardsByWorkerId);
router.get('/all/type/sensor_type', boardController.getSensorTypes);
router.delete('/remove/:board_id', boardController.removeBoardAsAdmin)

module.exports = router;