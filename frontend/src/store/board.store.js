import boardService from '../services/board.service.js';
import utilService from '../services/util.service.js';
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
            console.log('🚀 ~ file: board.store.js ~ line 21 ~ setCurrTask ~ task', task);
            state.task = task;
        },
        saveTask(state, { task }) {
            const board = JSON.parse(JSON.stringify(state.board));
            // console.log(board);
            const group = board.groups.find((group) => group.id === task.group.id);
            if (task.id) {
                //update
                console.log('Updating task', task);
                const taskIdx = group.tasks.findIndex(({ id }) => id === task.id);
                group.tasks.splice(taskIdx, 1, task);
            } else {
                //add
                console.log('Adding task', task);
                task.id = utilService.makeId();
                group.tasks.push(task);
            }
            this.commit({ type: 'setBoard', board });

            //console.log('Board store ~ save task ~ line 34 ~ Board', board);
            //console.log("board store ~ line 37 ~ saveTask ~ task", task)
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
