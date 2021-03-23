import { httpService } from './http.service.js';
import utilService from './util.service.js';

const BOARD_URL = 'board/';

export const boardService = {
  query,
  remove,
  save,
  getById,
  getEmptyBoard,
  getEmptyGroup,
  getEmptyTask,
};

function getById(boardId) {
  return httpService.get(BOARD_URL + boardId);
}

function query(filterBy) {
  return httpService.get(BOARD_URL, { params: filterBy });
}

function remove(id) {
  return httpService.delete(BOARD_URL + id);
}

function save(board) {
  if (board._id) {
    return httpService.put(BOARD_URL + board._id, board);
  } else {
    return httpService.post(BOARD_URL, board);
  }
}

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
  };
}
