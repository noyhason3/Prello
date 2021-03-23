const express = require('express')
const {requireAuth, requireAdmin} = require('../../middlewares/requireAuth.middleware')
const {log} = require('../../middlewares/logger.middleware')
const {getBoards, getBoard, addBoard, updateBoard, deleteBoard} = require('./board.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', getBoards);
router.get('/:boardId', getBoard);

router.post('/', addBoard); 
// router.post('/', requireAuth, requireAdmin, addBoard); 

router.put('/:boardId', updateBoard);
// router.put('/:boardId', requireAuth, requireAdmin, updateBoard);

// router.delete('/:boardId' , deleteBoard);
router.delete('/:boardId', requireAuth, requireAdmin, deleteBoard);



module.exports = router;







