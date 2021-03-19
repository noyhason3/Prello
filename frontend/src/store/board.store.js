import boardService from '../services/board.service.js';
import utilService from '../services/util.service.js';
export const boardStore = {
    state: {
        board: null,
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
            state.task = task;
        },
        async saveTask(state, { task }) {
            const { boardAns, taskAns } = await boardService.saveTask({ boardId: state.board._id, task })
            if (state.task && taskAns.id === state.task.id) this.commit({ type: 'setCurrTask', task: taskAns })
            this.commit({ type: 'setBoard', board: boardAns });
        },
        saveBoardLabels(state, { labels }) {
            const board = JSON.parse(JSON.stringify(state.board));
            board.labels = labels;
            this.commit({ type: 'setBoard', board });
        },
        saveGroup(state, { group }) {
            const board = JSON.parse(JSON.stringify(state.board));
            const groupIdx = board.groups.findIndex(({ id }) => id === group.id);
            if (group.id) {
                board.groups.splice(groupIdx, 1, group);
            } else {
                group.id = utilService.makeId();
                board.groups.push(group);
            }
            this.commit({ type: 'setBoard', board });
        },
        removeGroup(state, { groupId }) {
            const board = JSON.parse(JSON.stringify(state.board));
            const groupIdx = board.groups.findIndex(({ id }) => id === groupId);
            console.log('groupIdx:', groupIdx);
            if (groupIdx < 0) return;
            board.groups.splice(groupIdx, 1);
            this.commit({ type: 'setBoard', board });
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
