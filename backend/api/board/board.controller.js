const logger = require('../../services/logger.service');
// const userService = require('../user/user.service')
const socketService = require('../../services/socket.service');
const boardService = require('./board.service');
const asyncLocalStorage = require('../../services/als.service');

async function getBoards(req, res) {
    try {
        console.log('getting boards');
        const userId = req.session.user?._id || '';
        //TODO: const filterBy = req.body
        const boards = await boardService.query();
        // let userBoards = boards;
        // if (userId !== 'demo') {
        //   userBoards = boards.filter(({ createdBy }) => createdBy._id === userId);
        // }
        // res.send(userBoards);
        res.send(boards);
    } catch (err) {
        if (err.message === 'Not logged in') res.status(401).send({ err: err.message });

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
        const { board } = req.body;
        const { activity } = req.body;
        const { task } = req.body;
        const savedBoard = await boardService.update(board);
        const store = asyncLocalStorage.getStore();
        const { userId } = store;
        // if (task?.members.length){
        if (activity) {
            console.log('if activity');

            if (task?.members?.length) {
                console.log('if task.members');
                const memberList = _membersWithoutCurrMember(userId, task.members);
                
                memberList.forEach((member) => {
                    socketService.emitToUser({ type: 'activity-update', data: activity, userId: member._id });
                });
            } else {
                console.log('else');
                // socketService.broadcast({type:'board-update', data:{board, activity}, room:savedBoard._id })
                const memberList = _membersWithoutCurrMember(userId, board.members);
                
                memberList.forEach((member) => {
                    socketService.emitToUser({ type: 'activity-update', data: activity, userId: member._id });
                });
                // socketService.broadcast({type:'activity-update', data:{savedBoard, activity}, room:savedBoard._id })
            }
        }
        console.log('broadcast boardupdate');

        socketService.broadcast({ type: 'board-update', data: savedBoard, room: savedBoard._id });

        //   board.members.forEach(member => {
        //       socketService.emitToUser({type:'board-update', data:activity, userId:member._id })
        // }

        // socketService.broadcast({type:'board-update', data:activity, room:savedBoard._id })

        // socketService.emitToUser({type:'user-activity', data:activity, room:savedBoard._id })
        res.send(savedBoard);
    } catch (err) {
        logger.error('Failed to update board', err);
        res.status(500).send({ err: 'Failed to update board' });
    }
}

function _membersWithoutCurrMember(userId, memberList) {
    const updatedMemberList = [...memberList];
    const memberIdx = updatedMemberList.findIndex(({ _id }) => _id === userId);
    if(memberIdx>=0) updatedMemberList.splice(memberIdx, 1);
    return updatedMemberList;
}

module.exports = {
    getBoards,
    getBoard,
    deleteBoard,
    addBoard,
    updateBoard,
};
