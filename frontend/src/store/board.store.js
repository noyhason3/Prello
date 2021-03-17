export const boardStore = {
  state: {
    board: null,
    boardList:null
  },
  mutations: {
    setBoard(state, { savedBoard }) {
      state.board = savedBoard;
    },
    setBoardList(state, {boards}){
        state.boards = boards;
    }
  },
  actions: {
    async loadBoardList({ commit }) {
      try {
        const boards =  await boardService.query()
        commit({type:'setBoardList', boards})
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
    async loadBoard({ commit }) {
      try {
        const board = await boardService.query();
        commit({ type: 'setBoard', board });

        socketService.off(SOCKET_EVENT_BOARD_UPDATE);
        socketService.emit('joinBoard', board._id);
        socketService.on(SOCKET_EVENT_BOARD_UPDATE, (savedBoard) => {
          context.commit({ type: 'setBoard', savedBoard });
        });
        socketService.on(SOCKET_EVENT_TASK_UPDATE, (task) => {
          context.commit({ type: 'updateTask', task });
        });
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
    async saveBoard({ commit }, board) {
      try {
        await socketService.emit('saveBoard', board);

        const savedBoard = await boardService.save(board);
        commit({ type: 'setBoard', savedBoard });
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
  },
  modules: {},
};
