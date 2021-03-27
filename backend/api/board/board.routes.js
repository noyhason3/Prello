const express = require('express');
const {
  requireAuth,
  requireAdmin,
} = require('../../middlewares/requireAuth.middleware');
const { log } = require('../../middlewares/logger.middleware');
const {
  getBoards,
  getBoard,
  addBoard,
  updateBoard,
  deleteBoard,
} = require('./board.controller');
const router = express.Router();

// TODO: middleware that is specific to this router
//TODO: router.use(requireAuth)

router.get('/', getBoards);

router.get('/:boardId', getBoard);

router.post('/', addBoard);
//TODO: router.post('/', requireAuth, requireAdmin, addBoard);

router.put('/:boardId', updateBoard);
//TODO : Add a push for the board in case a board isn't found in the db router.put('/:boardId', requireAuth, requireAdmin, updateBoard);

//TODO : Add a push for the board in case a board isn't found in the db router.delete('/:boardId' , deleteBoard);
router.delete('/:boardId', requireAuth, deleteBoard);

module.exports = router;
