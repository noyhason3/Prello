import { httpService } from './http.service.js';
import utilService from './util.service.js';
import { userService } from './user.service.js';

const BOARD_URL = 'board/';

export const boardService = {
  query,
  remove,
  save,
  getById,
  getEmptyBoard,
  getEmptyGroup,
  getEmptyTask,
  getEmptyTemplate,
  getEmptyActivity,
};

function getById(boardId) {
  return httpService.get(BOARD_URL + boardId);
}

async function query(filterBy) {
  const ans = await httpService.get(BOARD_URL, { params: filterBy });
  return ans
}

function remove(id) {
  return httpService.delete(BOARD_URL + id);
}

async function save(data) {
  const board = data.board;
  if (board._id) {
    var savedBoard = await httpService.put(BOARD_URL + board._id, data);
    return savedBoard;
  } else {
    return await httpService.post(BOARD_URL, board);
  }
}
// async function save(board) {
//   if (board._id) {
//     var savedBoard = await httpService.put(BOARD_URL + board._id, board);
//     return savedBoard;
//   } else {
//     return await httpService.post(BOARD_URL, board);
//   }
// }

function getEmptyBoard() {
  return {
    title: '',
    createdAt: null,
    createdBy: {},
    style: { bgImg: {}, bgColor: {} },
    labels: [],
    members: [],
    groups: [],
    activities: [],
    lastViewedAt: null,
    isStarred: false,
  };
}

function getEmptyGroup() {
  return {
    title: '',
    tasks: [],
    style: {},
  };
}

function getEmptyTask() {
  return {
    title: '',
    description: '',
    //REMEMBER TO
    attachments: [],
    checklists: [],
    members: [],
    style: {
      coverColor: '',
      coverImg: '',
    },
  };
}

function getEmptyTemplate() {
  const groups = [];
  for (var i = 0; i < 5; i++) {
    let group = getEmptyGroup();
    group.id = utilService.makeId();
    groups.push(group);
  }
  return groups;
}

function getEmptyActivity({ currTask, txt }) {
  const loggedinUser = userService.getLoggedinUser();
  return {
    id: utilService.makeId(),
    txt,
    createdAt: Date.now(),
    byMember: {
      _id: loggedinUser._id,
      fullname: loggedinUser.fullname,
      // imgUrl: loggedinUser.imgUrl,
    },
    task: {
      id: currTask.id,
      title: currTask.title,
    },
  };
}
