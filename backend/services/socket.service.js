const asyncLocalStorage = require('./als.service');
const logger = require('./logger.service');

var gIo = null;
var gSocketBySessionIdMap = {};

function connectSockets(http, session) {
  gIo = require('socket.io')(http);

  const sharedSession = require('express-socket.io-session');

  gIo.use(
    sharedSession(session, {
      autoSave: true,
    })
  );
  gIo.on('connection', (socket) => {
    console.log(
      'New socket - socket.handshake.sessionID',
      socket.handshake.sessionID
    );
    gSocketBySessionIdMap[socket.handshake.sessionID] = socket;
    console.log('session user:', socket.handshake?.session?.user);
    socket.on('disconnect', (socket) => {
      console.log('Someone disconnected');
      if (socket.handshake) {
        gSocketBySessionIdMap[socket.handshake.sessionID] = null;
      }
    });
    socket.on('join-board', (boardId) => {
      if (socket.currBoard === boardId) return;
      if (socket.currBoard) {
        socket.leave(socket.currBoard);
      }
      socket.join(boardId);
      socket.currBoard = boardId;
    });
    socket.on('save-board', (board) => {
      socket.to(board._id).emit('board-update', board);
    });
    socket.on('join-task', (taskId) => {
      socket.join(taskId);
      socket.leave(taskId);
    });
    socket.on('leave-task', (taskId) => {
      socket.leave(taskId);
    });
    socket.on('user-watch', (userId) => {
      socket.join(userId);
    });
  });
}

function emitToAll({ type, data, room = null }) {
  if (room) gIo.to(room).emit(type, data);
  else gIo.emit(type, data);
}

function emitToUser({ type, data, userId }) {
  gIo.to(userId).emit(type, data);
}

// Send to all sockets BUT not the current socket
function broadcast({ type, data, room = null }) {
  const store = asyncLocalStorage.getStore();
  const { sessionId } = store;
  if (!sessionId)
    return logger.debug(
      'Shoudnt happen, no sessionId in asyncLocalStorage store'
    );
  const excludedSocket = gSocketBySessionIdMap[sessionId];
  if (!excludedSocket) return logger.debug('Shouldnt happen, No socket in map');
  if (room) excludedSocket.broadcast.to(room).emit(type, data);
  else excludedSocket.broadcast.emit(type, data);
}

module.exports = {
  connectSockets,
  emitToAll,
  broadcast,
};
