const { Router } = require('express');
const boardController = require('../controllers/boardController');
const router = Router();

router.get('/', boardController.getAllBoards);
router.get('/:board_id', boardController.getBoardByBoardId);
router.post('/', boardController.addBoard);
router.delete('/:board_id', boardController.removeBoard);
router.get('/allData/:board_id', boardController.getAllDataByBoardId);

module.exports = router;