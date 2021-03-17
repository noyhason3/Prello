import boardService from '../services/board.service.js';
export const boardStore = {
  state: {
    board: boardService.getDemoBoard(),
    boardList: null,
    task: null,
  },
  getters: {
    currBoard(state) {
      return state.board;
    },
    currTask(state) {
      return state.task;
    },
  },
  mutations: {
    setBoard(state, { board }) {
      state.board = board;
    },
    setCurrTask(state, { task }) {
      console.log(
        '🚀 ~ file: board.store.js ~ line 21 ~ setCurrTask ~ task',
        task
      );
      state.task = task;
    },
    saveTask(state, { task }) {
        console.log(task);
      const board = JSON.parse(JSON.stringify(state.board));
      console.log(board);
      const group = board.groups.find((group) => group.id === task.group.id);
      console.log(group);
      const taskIdx = group.tasks.findIndex(({ id }) => id === task.id);
      group.tasks.splice(taskIdx, 1, task);
    },
    // setBoardList(state, {boards}){
    //     state.boards = boards;
    // }
  },
  actions: {
    // async loadBoardList({ commit }) {
    //   try {
    //     // const boards =  await boardService.query()
    //     commit({type:'setBoardList', boards})
    //     //TODO: FIX LINES BELOW
    //     // socketService.off(SOCKET_EVENT_BOARD_UPDATE);
    //     // socketService.emit('join-user');  //user._id from the sessionStorage  //team._id from the backend
    //     // socketService.on(SOCKET_EVENT_BOARD_UPDATE, (savedBoard) => {
    //     //   context.commit({ type: 'setBoard', savedBoard });
    //     // });
    //     // socketService.on(SOCKET_EVENT_TASK_UPDATE, (task) => {
    //     //   context.commit({ type: 'updateTask', task });
    //     // });
    //   } catch (err) {
    //     console.log(err);
    //     throw err;
    //   }
    // },
    // async loadBoard({ commit }) {
    //   try {
    //     const board = await boardService.query();
    //     commit({ type: 'setBoard', board });
    //     // LINES BELOW ARE FINE!
    //     // socketService.off('board-update');
    //     // socketService.emit('join-board', board._id);
    //     // socketService.on('board-update', (board) => {
    //     //   context.commit({ type: 'setBoard', board });
    //     // });
    //     // socketService.on('task-update', (task) => {
    //     //   context.commit({ type: 'updateTask', task });
    //     // });
    //   } catch (err) {
    //     console.log(err);
    //     throw err;
    //   }
    // },
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
  },
};
