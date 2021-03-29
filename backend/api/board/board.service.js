const dbService = require('../../services/db.service');
const ObjectId = require('mongodb').ObjectId;
const asyncLocalStorage = require('../../services/als.service');
const logger = require('../../services/logger.service');

const DEMO_BOARDS = require('../../data/demo_boards.json')
const DEMO_BOARD = require('../../data/demo_board.json')

generateDemoBoards()

async function query(filterBy = {}) {
  try {
    console.log('getting boards');
    const store = asyncLocalStorage.getStore()
    const { userId } = store
    if (!userId) throw new Error('Not logged in')
    const criteria = _buildCriteria(filterBy);
    const collection = await dbService.getCollection('board');
    const boards = await collection.find({}).toArray();

    var demoBoards = []
    if (userId === 'demo') {
      //return await DEMO_BOARDS
      //TODO - Add a more sophisticated board population function - in case a board isn't found populate it with the data from the DEMO_BOARDS
      // return await DEMO_BOARDS
      demoBoards = await collection.find({ _id: { $regex: "demo" } }).toArray()
      //return demoBoards
    }

    const memberInBoards = await collection.find({ members: { $elemMatch: { _id: userId } } }).toArray()
    const memberCreatedBoards = await collection.find({ createdBy: { _id: userId } }).toArray();
    const concatinated = memberInBoards.concat(memberCreatedBoards).concat(demoBoards)
    const duplicateLess = concatinated.filter((v, i) => concatinated.indexOf(v) === i)
    return duplicateLess
    //return boards;

  } catch (err) {
    logger.error('cannot find boards', err);
    throw err;
  }
}

async function getById(boardId) {
  try {
    const collection = await dbService.getCollection('board');
    if (boardId.startsWith('demo')) {
      var board = await collection.findOne({ _id: boardId });
      if (board.groups && !board.groups.length) {
        generateBoardDemoData(board)
      }
      return board
    }

    return await collection.findOne({ _id: ObjectId(boardId) });
  } catch (err) {
    logger.error(`while finding board ${boardId}:`, err);
    throw err;
  }
}

async function remove(boardId) {
  try {
    // const store = asyncLocalStorage.getStore()
    // const { userId, isAdmin } = store
    const collection = await dbService.getCollection('board');
    // remove only if user is owner/admin
    const query = { _id: ObjectId(boardId) };
    console.log('query:', query)
    // if (!isAdmin) query.byUserId = ObjectId(userId)
    await collection.deleteOne(query);
    // return await collection.deleteOne({ _id: ObjectId(reviewId), byUserId: ObjectId(userId) })
  } catch (err) {
    logger.error(`cannot remove board ${boardId}`, err);
    throw err;
  }
}

async function update(board) {
  try {
    const collection = await dbService.getCollection('board');
    if (!board._id.includes('demo')) {
      console.log('non demo board - line 83 - board.service')
      board._id = ObjectId(board._id);
    }
    await collection.updateOne({ _id: board._id }, { $set: board });
    //await collection.insert({ ...board })
    return board;
  } catch (err) {
    logger.error(`cannot update board ${board._id}`, err);
    throw err;
  }
}

async function add(board) {
  try {
    board.createdAt = Date.now();
    const collection = await dbService.getCollection('board');
    await collection.insertOne(board);
    return board;
  } catch (err) {
    logger.error('cannot insert board', err);
    throw err;
  }
}

function _buildCriteria(filterBy) {
  const criteria = {};

  // if (filterBy.title) {
  //     criteria.title = ObjectId(filterBy.title)
  // }

  return criteria;
}

async function generateDemoBoards() { //Intended to be run when opening the site to make sure all the boards are present for guest mode
  const collection = await dbService.getCollection('board');
  DEMO_BOARDS.forEach(demoBoard => {
    if (demoBoard._id !== 'demo101') {
      console.log("file: board.service.js - line 115 - generateDemoBoards - demoBoard", demoBoard._id)
      //collection.updateOne({ _id: demoBoard.id }, { $set: { ...demoBoard } }, { upsert: true })
    }
  })
}

function generateBoardDemoData(board) { //Intended to make sure there is information in guest boards even after deletion
  board.groups = DEMO_BOARD.groups
  board.members = DEMO_BOARD.members
  board.labels = DEMO_BOARD.labels
  board.activities = DEMO_BOARD.activities
}

module.exports = {
  query,
  getById,
  remove,
  update,
  add,
};
