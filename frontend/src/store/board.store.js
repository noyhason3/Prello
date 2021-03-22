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
            console.log('state board',state.board);
        },
        setBoardList(state, {boardList}){
            state.boardList = boardList;
        },
        setCurrTask(state, { task }) {
            // console.log("🚀 ~ file: board.store.js ~ line 22 ~ setCurrTask ~ task", task)
            state.task = task;
        },
        async saveTask(state, { groupId, task }) {
            const ans = await boardService.saveTask({ boardId: state.board._id, groupId, task })
            if (state.task && ans.task.id === state.task.id) this.commit({ type: 'setCurrTask', task })
            this.commit({ type: 'setBoard', board: ans.board });
        },
        saveBoardLabels(state, { labels }) {
            const board = JSON.parse(JSON.stringify(state.board));
            board.labels = labels;
            this.commit({ type: 'setBoard', board });
        },
        async saveGroup(state, { group }) {
            // const board = JSON.parse(JSON.stringify(state.board));
            // const groupIdx = board.groups.findIndex(({ id }) => id === group.id);
            // if (group.id) {
            //     board.groups.splice(groupIdx, 1, group);
            // } else {
            //     group.id = utilService.makeId();
            //     board.groups.push(group);
            // }

            const board = await boardService.saveGroup({ boardId: state.board._id, group })
            this.commit({ type: 'setBoard', board });
        },
        async removeGroup(state, { groupId }) {
            // const board = JSON.parse(JSON.stringify(state.board));
            // const groupIdx = board.groups.findIndex(({ id }) => id === groupId);
            // console.log('groupIdx:', groupIdx);
            // if (groupIdx < 0) return;
            // board.groups.splice(groupIdx, 1);

            const board = await boardService.removeGroup({ groupId, boardId: state.board._id })
            this.commit({ type: 'setBoard', board });
        },
        removeBoard(state, {boardId}){
            console.log('boardId:', boardId)
            const boardIdx = state.boardList.findIndex(board => board._id === boardId)
            console.log(boardIdx);
            if(boardIdx < 0) return;
            state.boardList.splice(boardIdx, 1);
        }
        // setBoardList(state, {boards}){
            //     state.boards = boards;
            // }
        },
        actions: {
            async getGroup({state}) {
                const group = await state.board.groups.find(({ tasks }) => {
                    return tasks.some(({ id }) => id === state.task.id);
                });
                // console.log('group:', group);
                return group
            },
            async getEmptyBoard(){
                return boardService.getEmptyBoard();
            },
            async loadBoardList({commit}){
                try{
                    const boardList = await boardService.getBoardList();
                    commit({ type: 'setBoardList', boardList })
                    return boardList
                }catch(err){
                    console.log('err:', err)
                }
            },
            async saveBoard({commit}, {board}){
                try{
                    const newBoard = await boardService.saveBoard(board);
                    commit({ type: 'setBoard', newBoard })
                    return newBoard
                }catch(err){
                    console.log('err:', err)
                }
            },
            async removeBoard({commit},{boardId}){
                console.log('boardId:', boardId)
                try{
                    await boardService.removeBoard(boardId);
                    console.log('board deleted:', boardId);
                    commit({ type: 'removeBoard', boardId })
                }catch(err){
                    // console.log('err:', err)
                }
            }
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
