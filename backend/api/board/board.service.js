const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId
const asyncLocalStorage = require('../../services/als.service')

async function query(filterBy = {}) {
    try {
        const criteria = _buildCriteria(filterBy)
        const collection = await dbService.getCollection('board')
        const boards = await collection.find({}).toArray()
        // var reviews = await collection.aggregate([
        //     {
        //         $match: filterBy
        //     },
        //     {
        //         $lookup:
        //         {
        //             localField: 'byUserId',
        //             from: 'user',
        //             foreignField: '_id',
        //             as: 'byUser'
        //         }
        //     },
        //     {
        //         $unwind: '$byUser'
        //     },
        //     {
        //         $lookup:
        //         {
        //             localField: 'aboutUserId',
        //             from: 'user',
        //             foreignField: '_id',
        //             as: 'aboutUser'
        //         }
        //     },
        //     {
        //         $unwind: '$aboutUser'
        //     }
        // ]).toArray()
        // reviews = reviews.map(review => {
        //     review.byUser = { _id: review.byUser._id, fullname: review.byUser.fullname }
        //     review.aboutUser = { _id: review.aboutUser._id, fullname: review.aboutUser.fullname }
        //     delete review.byUserId
        //     delete review.aboutUserId
        //     return review
        // })

        return boards
    } catch (err) {
        logger.error('cannot find boards', err)
        throw err
    }

}


async function getById(boardId) {
    try {
        const collection = await dbService.getCollection('board')
        if (boardId === 'demo_board') {
            return await collection.findOne({ '_id': boardId })
        }
        return await collection.findOne({ '_id': ObjectId(boardId) })

    } catch (err) {
        logger.error(`while finding board ${boardId}:`, err);
        throw err
    }
}

async function remove(boardId) {
    try {
        // const store = asyncLocalStorage.getStore()
        // const { userId, isAdmin } = store
        const collection = await dbService.getCollection('board')
        // remove only if user is owner/admin
        const query = { '_id': ObjectId(boardId) }
        // if (!isAdmin) query.byUserId = ObjectId(userId)
        await collection.deleteOne(query)
        // return await collection.deleteOne({ _id: ObjectId(reviewId), byUserId: ObjectId(userId) })
    } catch (err) {
        logger.error(`cannot remove board ${boardId}`, err)
        throw err
    }
}

async function update(board) {
    try {
        const boardToSave = {
            _id: ObjectId(board._id),
            title: board.title,
            labels: board.labels,
            members: board.members,
            groups: board.groups,
            tasks: board.tasks
        }
        const collection = await dbService.getCollection('board')
        await collection.updateOne({ '_id': boardToSave._id }, { $set: boardToSave })
        return boardToSave
    } catch (err) {
        logger.error(`cannot update board ${board._id}`, err)
        throw err
    }
}


async function add(board) {
    try {
        // peek only updatable fields!
        const boardToAdd = {
            title: board.title,
            labels: board.labels,
            members: board.members,
            groups: board.groups,
            tasks: board.tasks,
            createdAt: Date.now()
        }
        const collection = await dbService.getCollection('board')
        await collection.insertOne(boardToAdd)
        return boardToAdd;
    } catch (err) {
        logger.error('cannot insert board', err)
        throw err
    }
}

function _buildCriteria(filterBy) {
    const criteria = {}

    // if (filterBy.title) {
    //     criteria.title = ObjectId(filterBy.title)
    // }

    return criteria
}

module.exports = {
    query,
    getById,
    remove,
    update,
    add
}


