// export const boardStore = {
//   state: {
//     board: null,
//     boardList:null
//   },
//   mutations: {
//     setBoard(state, { savedBoard }) {
//       state.board = savedBoard;
//     },
//     setBoardList(state, {boards}){
//         state.boards = boards;
//     }
//   },
//   actions: {
//     async loadBoardList({ commit }) {
//       try {
//         const boards =  await boardService.query()
//         commit({type:'setBoardList', boards})

//         //TODO: FIX LINES BELOW

//         // socketService.off(SOCKET_EVENT_BOARD_UPDATE);
//         // socketService.emit('join-user');  //user._id from the sessionStorage  //team._id from the backend
//         // socketService.on(SOCKET_EVENT_BOARD_UPDATE, (savedBoard) => {
//         //   context.commit({ type: 'setBoard', savedBoard });
//         // });
//         // socketService.on(SOCKET_EVENT_TASK_UPDATE, (task) => {
//         //   context.commit({ type: 'updateTask', task });
//         // });

//       } catch (err) {
//         console.log(err);
//         throw err;
//       }
//     },
//     async loadBoard({ commit }) {
//       try {
//         const board = await boardService.query();
//         commit({ type: 'setBoard', board });

//         // LINES BELOW ARE FINE!

//         // socketService.off('board-update');
//         // socketService.emit('join-board', board._id);
//         // socketService.on('board-update', (savedBoard) => {
//         //   context.commit({ type: 'setBoard', savedBoard });
//         // });
//         // socketService.on('task-update', (task) => {
//         //   context.commit({ type: 'updateTask', task });
//         // });
//       } catch (err) {
//         console.log(err);
//         throw err;
//       }
//     },
//     async saveBoard({ commit }, board) {
//       try {
//         // await socketService.emit('saveBoard', board);

//         const savedBoard = await boardService.save(board);
//         commit({ type: 'setBoard', savedBoard });
//       } catch (err) {
//         console.log(err);
//         throw err;
//       }
//     },
//   },
//   modules: {},
// };
