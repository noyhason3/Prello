import { httpService } from './http.service.js';
import { utilService } from './util.service.js';

const BOARD_URL = 'board/';

export const boardService = {
  query,
  remove,
  save,
  getById,
  getEmptyBoard,
};

function getById(toyId) {
  return httpService.get(BOARD_URL + toyId);
}

function getEmptyBoard() {
  return {
    title: '',
    createdAt: null,
    createdBy: {},
    style: {
      imgUrl: '',
      color: '#' + utilService.getRandomIntInclusive(111, 999),
    },
    labels: [],
    members: [],
    groups: [],
    activities: [],
  };
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
