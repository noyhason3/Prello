const logger = require('../../services/logger.service');
// const userService = require('../user/user.service')
// const socketService = require('../../services/socket.service')
const boardService = require('./board.service');

async function getBoards(req, res) {
  try {
    // const filterBy = req.body
    const boards = await boardService.query();
    res.send(boards);
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
    res.send({ deleteBoard, msg: 'Deleted successfully' });
  } catch (err) {
    logger.error('Failed to delete board', err);
    res.status(500).send({ err: 'Failed to delete board' });
  }
}

async function addBoard(req, res) {
  try {
    var board = req.body;
    console.log("file: board.controller.js - line 42 - addBoard - board", board)
    // board.createdBy = {
    //   _id: req.session.user._id,
    //   fullname: req.session.user.fullname,
    //   imgUrl: req.session.user.imgUrl,
    // };
    board = await boardService.add(board);
    //  MAYBE WE SHOULD USE BELOW CODE TO USE THE MINI USER ONLY FOR THE FRONT ///////////////////////////
    // board.createdBy ={
    //     _id: req.session.user._id,
    //     fullname: req.session.user.fullname,
    //     imgUrl: req.session.user.imgUrl
    // }

    ////////////////////// SAME BELOW-- THE STARTER CODE WE GOT ///////////////////////////////
    // prepare the updated board for sending out
    // board.byUser = await userService.getById(board.byUserId);
    // board.aboutUser = await userService.getById(board.aboutUserId);

    ///////////////////////// BELOW IS CODE FOR ADVANED STEPS WITH WEB SOCKETS ////////////////////
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
    console.log("file: board.controller.js - line 80 - updateBoard - board", board)
    const savedBoard = await boardService.update(board);
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
