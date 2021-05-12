// import boardService from '../services/board.service.js';
import { boardService } from '../services/board.service.js';
import { socketService } from '@/services/socket.service.js';
import utilService from '../services/util.service.js';
import { showMsg } from '../services/eventBus.service.js';

export const boardStore = {
    state: {
        board: null,
        boards: null,
        task: null,
        mainHeader: null,
        boardHeader: null,
    },
    getters: {
        boards(state) {
            return state.boards;
        },
        currBoard(state) {
            return state.board;
        },
        currTask(state) {
            return state.task;
        },
        mainHeader(state) {
            return state.mainHeader;
        },
        boardHeader(state) {
            return state.boardHeader;
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
        setBoard(state, { board }) {
            state.board = board;
            if (board) {
              const boardIdx = state.boards.findIndex(({_id}) => _id === board._id);
              if (boardIdx < 0) state.boards.push(board);
              state.boards.splice(boardIdx, 1, board);
          }
        },
        setBoards(state, { boards }) {
            state.boards = boards;
        },
        setCurrTask(state, { task }) {
            state.task = task;
        },
        removeBoard(state, { boardId }) {
            const boardIdx = state.boards.findIndex((board) => board._id === boardId);
            if (boardIdx < 0) return;
            state.boards.splice(boardIdx, 1);
        },
        setMainHeader(state, { mainHeader }) {
            state.mainHeader = mainHeader;
        },
        setBoardHeader(state, { boardHeader }) {
            state.boardHeader = boardHeader;
        },
    },
    actions: {
        async loadBoards({ commit }) {
            try {
                const boards = await boardService.query();
                commit({ type: 'setBoards', boards });
                return boards;
            } catch (err) {
                console.log('err:', err);
            }
        },

        async getBoard({ commit }, { boardId }) {
            try {
                const board = await boardService.getById(boardId);
                commit({ type: 'setBoard', board });
                // socketService.setup();//Not sure if needed, happens in the service anyway
                socketService.emit('join-board', boardId);
                socketService.off('board-update');
                socketService.on('board-update', (savedBoard) => {
                    // console.log('board updated-socket');
                    commit({ type: 'setBoard', board: savedBoard });
                    // socketService.on('board-update', ({ savedBoard, activity }) => {
                    //   console.log('board updated-socket');
                    //   commit({ type: 'setBoard', board:savedBoard });
                    //   showMsg(activity.txt);
                });
                // socketService.on('task-update', (task) => {
                //   context.commit({ type: 'updateTask', task });
                // });
                // socketService.terminate();
            } catch (err) {
                console.log('err', err);
            }
        },
        async saveBoard({ commit }, { board, activity, task }) {
            try {
                // if (activity){
                var currBoard = await boardService.save({ board, activity, task });
                // console.log('currBoard:', currBoard)
                // } else {
                // var currBoard = await boardService.save({ board, task });
                // }
                commit({ type: 'setBoard', board: currBoard });
                return currBoard;
            } catch (err) {
                console.log('err:', err);
            }
        },
        async removeBoard({ commit }, { boardId }) {
            try {
                await boardService.remove(boardId);
                // console.log('board deleted:', boardId);
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
        async saveGroup({ state, commit, dispatch }, { group }) {
            const board = JSON.parse(JSON.stringify(state.board));
            if (group.id) {
                const groupIdx = board.groups.findIndex(({ id }) => id === group.id);
                board.groups.splice(groupIdx, 1, group);
            } else {
                group.id = utilService.makeId();
                board.groups.push(group);
            }
            //await boardService.save(board);
            // console.log('board', board);
            await dispatch({ type: 'saveBoard', board });
            commit({ type: 'setBoard', board });
        },
        async removeGroup({ commit, dispatch, state }, { groupId }) {
            const board = JSON.parse(JSON.stringify(state.board));
            const groupIdx = board.groups.findIndex(({ id }) => id === groupId);
            if (groupIdx < 0) return;
            board.groups.splice(groupIdx, 1);
            // console.log('Remove group - line 134 - board store - board', board);
            //await boardService.save(board);
            await dispatch({ type: 'saveBoard', board });
            commit({ type: 'setBoard', board });
        },
        async saveTask({ commit, state, dispatch }, { groupId, task, activityType }) {
            const board = JSON.parse(JSON.stringify(state.board));
            // const activity = boardService.getEmptyActivity({
            //   currTask: task,
            //   txt: activityType,
            // });
            // board.activities.push(activity);
            // console.log('file: board.store.js - line 152 - getBoard - task', task);
            // console.log(groupId);
            if (groupId) {
                var group = board.groups.find((savedGroup) => {
                    return savedGroup.id === groupId;
                });
                // console.log('group', group);
            } else {
                // console.log(board.groups);
                // console.log(task);
                group = board.groups.find((savedGroup) => savedGroup.tasks.some((groupTask) => groupTask.id === task.id));
            }
            if (task.id) {
                //update
                // console.log('Updating task', task);
                const taskIdx = group.tasks.findIndex(({ id }) => id === task.id);
                group.tasks.splice(taskIdx, 1, task);
            } else {
                //add
                // console.log('group', group);
                // console.log('Adding task', task);
                task.id = utilService.makeId();
                group.tasks.push(task);
            }
            try {
                // if(activityType){
                const activity = boardService.getEmptyActivity({
                    currTask: task,
                    txt: activityType,
                });
                board.activities.push(activity);

                // console.log('file: board.store.js - line 192 - getBoard - board', board);
                // console.log('activity', activity);
                // await dispatch('saveBoard', { board, activity, task });
                await dispatch('saveBoard', { board, activity, task });
                // } else {
                //   await dispatch('saveBoard', { board, task });
                // }
                // dispatch('saveBoard', { board, activity, task });
                commit({ type: 'setCurrTask', task });
            } catch (err) {
                console.log('err:', err);
            }
        },
        async removeTask({ state, commit, dispatch }, { taskId, activityType }) {
            const board = JSON.parse(JSON.stringify(state.board));

            board.activities.push(activity);

            const group = board.groups.find((savedGroup) => savedGroup.tasks.some((savedTask) => savedTask.id === taskId));
            const taskIdx = group.tasks.findIndex((savedTask) => savedTask.id === taskId);
            if (taskIdx < 0) return;

            const task = group.tasks.splice(taskIdx, 1);
            const activity = boardService.getEmptyActivity({
                currTask: task,
                txt: activityType,
            });

            try {
                await dispatch('saveBoard', { board, activity });
            } catch (err) {
                console.log('err:', err);
            }
        },

        async saveBoardLabels({ state, commit, dispatch }, { labels }) {
            const board = JSON.parse(JSON.stringify(state.board));

            const activity = boardService.getEmptyActivity({
                currTask: state.task,
                txt: 'Label added!',
            });
            board.labels = labels;
            board.activities.push(activity);
           
            try {
                await dispatch('saveBoard', { board });
                commit({ type: 'setBoard', board });
            } catch (err) {
                console.log('err:', err);
            }
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
    },
};

// ********** Activity

// const activity = {};
