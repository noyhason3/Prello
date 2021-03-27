const dbService = require('../../services/db.service');
const ObjectId = require('mongodb').ObjectId;
const asyncLocalStorage = require('../../services/als.service');
const logger = require('../../services/logger.service');

const DEMO_BOARDS = require('../../data/demo_boards.json')
const DEMO_BOARD = require('../../data/demo_board.json')

async function query(filterBy = {}) {
  try {
    console.log('getting boards');
    const store = asyncLocalStorage.getStore()
    const { userId } = store
    const criteria = _buildCriteria(filterBy);
    const collection = await dbService.getCollection('board');
    const boards = await collection.find({}).toArray();
    
    if (userId === 'demo') {
      //return await DEMO_BOARDS
      //TODO - Add a more sophisticated board population function - in case a board isn't found populate it with the data from the DEMO_BOARDS
      // return await DEMO_BOARDS
      const demoBoards = await collection.find({ _id: { $regex: "demo" } }).toArray()
      return demoBoards
    } else {
      const memberInBoards = await collection.find({ members: { $elemMatch: { _id: userId } } })
      const memberCreatedBoards = await collection.find({ createdBy:  { _id: ObjectId(userId) } }).toArray();
      console.log('memberCreatedBoards:', memberCreatedBoards)
      console.log("file: board.service.js - line 22 - query - memberInBoards", memberInBoards.length)
      return memberInBoards
      return boards;
    }
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
        populateDemoData(board)
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
    // board._id = ObjectId(board._id);                      **************************** NEED TO BE UN-COMMENT AFTER CHANGING DEMO-ID
    const collection = await dbService.getCollection('board');
    await collection.updateOne({ _id: board._id }, { $set: board });
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

function populateDemoData(board) {
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
