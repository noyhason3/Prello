const logger = require('../../services/logger.service');
// const userService = require('../user/user.service')
const socketService = require('../../services/socket.service')
const boardService = require('./board.service');

async function getBoards(req, res) {
  try {
    const userId = req.session.user._id;
    //TODO: const filterBy = req.body
    const boards = await boardService.query();
    let userBoards = boards;
    if (userId !== 'demo') {
      userBoards = boards.filter(({ createdBy }) => createdBy._id === userId);
    }
    res.send(userBoards);
  } catch (err) {
    logger.error('Cannot get boards', err);
    res.status(500).send({ err: 'Failed to get boards' });
  }
}

async function getBoard(req, res) {
  try {
    const boardId = req.params.boardId;
    const board = await boardService.getById(boardId);
    res.json(board);
  } catch (err) {
    logger.error('Failed to get board', err);
    res.status(500).send({ err: 'Failed to get board' });
  }
}

async function deleteBoard(req, res) {
  try {
    const boardId = req.params.boardId;
    const deletedBoard = await boardService.remove(boardId);
    res.send({ deletedBoard, msg: 'Deleted successfully' });
  } catch (err) {
    logger.error('Failed to delete board', err);
    res.status(500).send({ err: 'Failed to delete board' });
  }
}

async function addBoard(req, res) {
  try {
    var board = req.body;
    board.createdBy = {
      _id: req.session.user._id,
    };
    board = await boardService.add(board);

    board.createdBy.fullname = req.session.user.fullname;
    board.createdBy.imgUrl = req.session.user.imgUrl;

    ///////////////////////// BELOW IS CODE FOR ADVANCED STEPS WITH WEB SOCKETS ////////////////////
    // console.log('CTRL SessionId:', req.sessionID);
    // socketService.broadcast({ type: 'board-added', data: board });
    // socketService.emitToAll({
    //   type: 'user-updated',
    //   data: board.byUser,
    //   room: req.session.user._id,
    // });

    res.send(board);
  } catch (err) {
    console.log(err);
    logger.error('Failed to add board', err);
    res.status(500).send({ err: 'Failed to add board' });
  }
}

async function updateBoard(req, res) {
  try {
    const board = req.body;
    const activity = req.body;
    const task = req.body;
    // console.log('board',board);
    // console.log('activity',activity);
    // console.log('task',task);
    task.members.forEach(member => {
      // console.log(member, '-----------------------------------------------------');
        socketService.emitToUser({type:'activity-update', data:activity, userId:member._id })
    });
    const savedBoard = await boardService.update(board);
    socketService.broadcast({type:'board-update', data:board, room:savedBoard._id })
    // socketService.broadcast({type:'task-update', data:board, room:task.id })
    // socketService.broadcast({type:'board-update', data:activity, room:savedBoard._id })



    // socketService.emitToUser({type:'user-activity', data:activity, room:savedBoard._id })
    res.send(savedBoard);
  } catch (err) {
    logger.error('Failed to update board', err);
    res.status(500).send({ err: 'Failed to update board' });
  }
}

module.exports = {
  getBoards,
  getBoard,
  deleteBoard,
  addBoard,
  updateBoard,
};
