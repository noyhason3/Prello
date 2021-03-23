// import boardService from '../services/board.service.js';
import { boardService } from '../services/board.service.js';
import { socketService } from '@/services/socket.service.js';
import utilService from '../services/util.service.js';
export const boardStore = {
    state: {
        board: null,
        boards: null,
        task: null,
    },
    getters: {
        currBoard(state) {
            return state.board;
        },
        currTask(state) {
            return state.task;
        },
        emptyBoard() {
            return boardService.getEmptyBoard();
        },
        getEmptyGroup() {
            return boardService.getEmptyGroup();
        },
        getEmptyTask() {
            return boardService.getEmptyTask();
        },
    },
    mutations: {
        setBoard(state, { currBoard }) {
            state.board = currBoard;
            // console.log('state board', state.board);
        },
        setBoards(state, { boards }) {
            state.boards = boards;
        },
        setCurrTask(state, { task }) {
            state.task = task;
        },
        removeBoard(state, { boardId }) {
            console.log('boardId:', boardId);
            const boardIdx = state.boardList.findIndex((board) => board._id === boardId);
            console.log(boardIdx);
            if (boardIdx < 0) return;
            state.boardList.splice(boardIdx, 1);
        },

        // setBoardList(state, {boards}){
        //     state.boards = boards;
        // }
    },
    actions: {
        async loadBoards({ commit }) {
            try {
                const boards = await boardService.query();
                // console.log('boards:', boards);
                commit({ type: 'setBoards', boards });
                return boards;
            } catch (err) {
                console.log('err:', err);
            }
        },

        async getBoard({ commit }, { boardId }) {
            try {
                const currBoard = await boardService.getById(boardId);
                commit({ type: 'setBoard', currBoard });
                // socketService.setup();//Not sure if needed, happens in the service anyway
                socketService.off('board-update');
                socketService.emit('join-board', boardId);
                socketService.on('board-update', (board) => {
                    console.log('socket emitted- board update');
                    commit({ type: 'setBoard', currBoard:board });
                });
                // socketService.on('task-update', (task) => {
                //   context.commit({ type: 'updateTask', task });
                // });
                // socketService.terminate();
            } catch (err) {
                console.log('err', err);
            }
        },
        async saveBoard({ commit }, { board }) {
            try {
                const currBoard = await boardService.save(board);
                // commit({ type: 'setBoard', currBoard });
                await socketService.emit('save-board', currBoard);
                return currBoard;
            } catch (err) {
                console.log('err:', err);
            }
        },

        async removeBoard({ commit }, { boardId }) {
            try {
                await boardService.remove(boardId);
                console.log('board deleted:', boardId);
                commit({ type: 'removeBoard', boardId });
            } catch (err) {
                console.log('err:', err);
            }
        },
        async getGroup({ state }) {
            const group = await state.board.groups.find(({ tasks }) => {
                return tasks.some(({ id }) => id === state.task.id);
            });
            return group;
        },
        async saveGroup({ state, commit }, { group }) {
            const board = JSON.parse(JSON.stringify(state.board));
            const groupIdx = board.groups.findIndex(({ id }) => id === group.id);
            if (group.id) {
                board.groups.splice(groupIdx, 1, group);
            } else {
                group.id = utilService.makeId();
                board.groups.push(group);
            }

            await boardService.save(board);
            commit({ type: 'setBoard', currBoard: board });
        },
        async removeGroup({ commit, state }, { groupId }) {
            const board = JSON.parse(JSON.stringify(state.board));
            const groupIdx = board.groups.findIndex(({ id }) => id === groupId);
            if (groupIdx < 0) return;
            board.groups.splice(groupIdx, 1);

            await boardService.save(board);
            commit({ type: 'setBoard', currBoard: board });
        },
        async saveTask({ commit, state, dispatch }, { groupId, task }) {
            const board = JSON.parse(JSON.stringify(state.board));

            if (groupId) var group = board.groups.find((savedGroup) => savedGroup.id === groupId);
            else group = board.groups.find((savedGroup) => savedGroup.tasks.some((savedTask) => savedTask.id === task.id));
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
            try {
                await dispatch('saveBoard', { board });
                commit({ type: 'setCurrTask', task });
            } catch (err) {
                console.log('err:', err);
            }
        },
        async removeTask({ state, commit }, { taskId }) {
            console.log('hi');
            const board = JSON.parse(JSON.stringify(state.board));
            const group = board.groups.find((savedGroup) => savedGroup.tasks.some((savedTask) => savedTask.id === taskId));
            const taskIdx = group.tasks.findIndex((savedTask) => savedTask.id === taskId);
            if (taskIdx < 0) return;
            group.tasks.splice(taskIdx, 1);
            try {
                await dispatch('saveBoard', { board });
            } catch (err) {
                console.log('err:', err);
            }
            //   return Promise.resolve({ group, board });
        },

        async saveBoardLabels({ state, commit }, { labels }) {
            const board = JSON.parse(JSON.stringify(state.board));
            board.labels = labels;

            await boardService.save(board);
            commit({ type: 'setBoard', currBoard: board });
        },

        // FOR ADVANCED STEPS- WITH WEB SOCKETS *****************************************
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

        //old ones
        // async getBoard({ commit }, { boardId }) {
        //   try {
        //     const currBoard = await boardService.getById(boardId);
        //     commit({ type: 'setBoard', currBoard });
        //   } catch (err) {
        //     console.log('err', err);
        //   }
        // },
        // async saveBoard({ commit }, { board }) {
        //   try {
        //     const currBoard = await boardService.save(board);
        //     commit({ type: 'setBoard', currBoard });
        //     // socket comes here
        //     return currBoard;
        //   } catch (err) {
        //     console.log('err:', err);
        //   }
        // },
    },
};

// ********** Activity

const activity = {};
