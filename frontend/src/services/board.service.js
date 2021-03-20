import utilService from "./util.service";
import storageService from './async-storage-service.js'

const DB_KEY = 'boards_db'
const DEMO_BOARD = {
    "_id": "b101",
    "title": "Web Dev. Prello Management",
    "createdAt": 1589983468418,
    "createdBy": {
        "_id": "u101",
        "fullname": "Abi Abambi",
        "imgUrl": "http://some-img"
    },
    style: {},
    labels: [
        {
            id: 'done',
            title: 'Done',
            color: '#51E898',
        },
        {
            id: 'important',
            title: 'Imporant',
            color: '#EB5A46',
        },
        {
            id: 'progress',
            title: 'In Progress',
            color: '#0079BF',
        },
        {
            id: 'hold',
            title: 'On hold',
            color: '#F0DB3A',
        },
    ],
    members: [
        {
            _id: 'u101',
            username: 'Tal',
            fullname: 'Tal Tarablus',
            imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
        },
        {
            _id: 'u102',
            username: 'Noam',
            fullname: 'Noam Ben Yosef',
        },
        {
            _id: 'u103',
            username: 'Gabi1337',
            fullname: 'Gabi Amsalem',
            imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
        },
        {
            _id: 'u104',
            username: 'Efi',
            fullname: 'Efrat Kaminski',
            imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
        },
        {
            _id: 'u105',
            username: 'Dov',
            fullname: 'Dov Menashe',
            imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
        },
        {
            _id: 'u107',
            username: 'Benny',
            fullname: 'Biniamin Shemi',
            imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
        },
        {
            _id: 'u108',
            username: 'Keshet',
            fullname: 'Keshet Sheshet',
            imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
        },
        {
            _id: 'u109',
            username: 'Goni',
            fullname: 'Anna Avraham',
            imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
        },
    ],
    groups: [
        {
            id: 'g101',
            title: 'Backlog',
            tasks: [
                {
                    id: 'c101',
                    title: 'REMINDER!',
                    description: 'Please refrain from editing other people\'s work. \n Reviewed every 2nd sunday',
                    checklists: [],
                    attachments: [],
                    labelIds: ['important']
                },
                {
                    id: 'c102',
                    title: 'Additional views for board',
                    description: 'Enable the user to view his tasks consistently across multiple layouts',
                    checklists: [],
                    members: [
                        {
                            _id: 'u104',
                            username: 'Efi',
                            fullname: 'Efrat Kaminski',
                            imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                        },
                        {
                            _id: 'u105',
                            username: 'Dov',
                            fullname: 'Dov Menashe',
                            imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                        },
                    ],
                    attachments: [
                        {
                            id: 'a101',
                            title: 'Ex. 1 -- Table View',
                            url: 'https://dapulse-res.cloudinary.com/image/upload/f_auto,q_auto/remote_mondaycom_static/uploads/NitzanChen/2734acac-d903-476a-9332-32050c06df79_1050_772_green.png',
                            createdAt: '1616155239874',
                        },
                        {
                            id: 'a102',
                            title: 'Ex. 2 -- Timeline View',
                            url: 'https://www.smartsheet.com/sites/default/files/IC-Project-Timeline-Template.jpg',
                            createdAt: '1616155239874',
                        },
                    ],
                },
                {
                    id: 'c103',
                    title: 'Customization Features',
                    description: 'For the tracking of the conceptualization and approval process of customization features',
                    checklists: [
                        {
                            id: 'PRBYH',
                            title: 'Board Customization',
                            todos: [
                                {
                                    id: '34fsc',
                                    txt: 'Board Customization - Cover - UI',
                                    isDone: true,
                                },
                                {
                                    id: '3sdfrc',
                                    txt: 'Board Customization - Cover - UX',
                                    isDone: true,
                                },
                                {
                                    id: '3dffsc',
                                    txt: 'Board Customization - Animations - UX',
                                    isDone: false,
                                },
                            ],
                        },
                        {
                            id: 'PRBSD',
                            title: 'Task Customization',
                            todos: [
                                {
                                    id: '34hgjc',
                                    txt: 'UX Rework',
                                    isDone: false,
                                },
                                {
                                    id: '3hvsc',
                                    txt: 'Concept redesign',
                                    isDone: false,
                                },
                                {
                                    id: '3bhjc',
                                    txt: 'Full feature list',
                                    isDone: false,
                                },
                                {
                                    id: '3bhjd',
                                    txt: 'Full feature data flow',
                                    isDone: false,
                                },
                            ],
                        },
                    ],
                    attachments: [],
                },

            ],
            style: {},
        },
        {
            id: 'g102',
            title: 'New Features',
            tasks: [
                {
                    id: 'c104',
                    title: 'Cover Customization',
                    description: 'Enable picture customzation in addition to color',
                    checklists: [],
                    attachments: [],
                    labelIds: ['done']
                },
                {
                    id: 'c105',
                    title: 'Suggested templates by user usage',
                    comments: [
                        {
                            id: 'ZdPnm',
                            txt: 'also @yaronb please CR this',
                            createdAt: 1590999817436.0,
                            byMember: {
                                _id: 'u101',
                                fullname: 'Tal Tarablus',
                                imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                            },
                        },
                    ],
                    checklists: [
                        {
                            id: 'YEhmF',
                            title: 'Data Gathering',
                            todos: [
                                {
                                    id: '212jX',
                                    txt: 'Activity handler design doc',
                                    isDone: true,
                                },
                                {
                                    id: '212js',
                                    txt: 'Activity handler design approval',
                                    isDone: false,
                                },
                                {
                                    id: '212jz',
                                    txt: 'Activity handler design base implementation',
                                    isDone: false,
                                },
                                {
                                    id: '212jh',
                                    txt: 'Activity handler design training cycle',
                                    isDone: false,
                                },
                            ],
                        }
                    ],
                    attachments: [],
                    members: [
                        {
                            _id: 'u101',
                            username: 'Tal',
                            fullname: 'Tal Tarablus',
                            imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                        },
                        {
                            _id: 'u103',
                            username: 'Gabi',
                            fullname: 'Gabi Amsalem',
                            imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                        },
                        {
                            _id: 'u107',
                            username: 'Benny',
                            fullname: 'Biniamin Shemi',
                            imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                        },

                    ],
                    labelIds: ['progress', 'important'],
                    createdAt: 1590999730348,
                    dueDate: 16156215211,
                    byMember: {
                        _id: 'u101',
                        username: 'Tal',
                        fullname: 'Tal Tarablus',
                        imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                    },
                    style: {
                        bgColor: '#26de81',
                    },
                },
            ],
            style: {},
        },
        {
            id: 'g103',
            title: 'Running tasks',
            tasks: [
            ],
            style: {},
        },
        {
            id: 'g104',
            title: 'Fix & Upgrade',
            tasks: [
                {
                    id: 'THDG',
                    title: 'Replace logo',
                    checklists: [],
                    attachments: [
                        {
                            id: 'a103',
                            title: 'Logo inspiration',
                            url: 'https://trimitiy.com/assets/images/logo/new-logo-white.png',
                            createdAt: '1616155239874',
                        },
                        {
                            id: 'a104',
                            title: 'another logo option',
                            url: 'https://printfiam.com/wp-content/uploads/2020/02/contant-logo.png',
                            createdAt: '16161455239874',
                        },
                        {
                            id: 'a105',
                            title: 'smile!',
                            url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Gnome-face-smile-big.svg/1024px-Gnome-face-smile-big.svg.png',
                            createdAt: '1616152734274',
                        },
                    ],
                    labelIds: ['progress'],
                    members: [
                        {
                            _id: 'u104',
                            username: 'Efi',
                            fullname: 'Efrat Kaminski',
                            imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                        },
                        {
                            _id: 'u101',
                            username: 'Tal',
                            fullname: 'Tal Tarablus',
                            imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                        },
                    ]
                },
                {
                    id: 'GDSJKM',
                    title: 'D&D Feature customization',
                    checklists: [],
                    attachments: [],
                    labelIds: ['hold']
                },
            ],
            style: {},
        },
        {
            id: 'g105',
            title: 'Testing',
            tasks: [
                {
                    id: 'GHH9f',
                    title: 'User login from different sources',
                    checklists: [],
                    attachments: [],
                    labelIds: ['progress']
                },
                {
                    id: 'GDSJKL',
                    title: 'Better dashboard implementation for 3rd party software',
                    checklists: [],
                    attachments: [],
                    labelIds: ['hold'],
                    members: [
                        {
                            _id: 'u109',
                            username: 'Goni',
                            fullname: 'Anna Avraham',
                            imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                        },
                    ]
                },
                {
                    id: 'GDSJKP',
                    title: 'User satiabillity and experience tests',
                    checklists: [],
                    attachments: [],
                    labelIds: ['hold', 'important'],
                    members: [
                        {
                            _id: 'u107',
                            username: 'Benny',
                            fullname: 'Biniamin Shemi',
                            imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                        },
                        {
                            _id: 'u102',
                            fullname: 'Noam Ben Yosef',
                        },
                    ]
                },
            ],
            style: {},
        },
        {
            id: 'g106',
            title: 'Ready',
            tasks: [
                {
                    id: 'DFHJ',
                    title: 'Add Samples',
                    checklists: [
                        {
                            id: 'MGFH',
                            title: 'Design',
                            todos: [
                                {
                                    id: 'GRRAA',
                                    txt: 'Create sample designs',
                                    isDone: true,
                                },
                                {
                                    id: 'SHMONE',
                                    txt: 'Approve sample desings',
                                    isDone: true,
                                },
                                {
                                    id: 'IMFAT',
                                    txt: 'Make desings',
                                    isDone: true,
                                },
                            ],
                        },
                        {
                            id: 'SRYSB',
                            title: 'Implementation',
                            todos: [
                                {
                                    id: 'dsagjkl',
                                    txt: 'Create design templates for smooth implementation across all platforms',
                                    isDone: false,
                                },
                                {
                                    id: 'SHMONE',
                                    txt: 'Implement design into all product displays',
                                    isDone: false,
                                },
                            ],
                        },
                    ],
                    labelIds: ['progress', 'important'],
                    attachments: [],
                    members: [
                        {
                            _id: 'u108',
                            username: 'Keshet',
                            fullname: 'Keshet Sheshet',
                            imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                        },
                    ],
                },
            ],
            style: {},
        },
    ],
    activities: [
        {
            id: 'a101',
            txt: 'Changed Color',
            createdAt: 154514,
            byMember: {
                _id: 'u101',
                fullname: 'Abi Abambi',
                imgUrl: 'http://some-img',
            },
            "task": {
                "id": "t101",
                "title": "Replace Logo"
            }
        }
    ]
}


// checklists: [
//     {
//         id: 'PRBYH',
//         title: 'Board Customization',
//         todos: [
//             {
//                 id: '34fsc',
//                 txt: 'Vuex',
//                 isDone: true,
//             },
//             {
//                 id: '3sdfrc',
//                 txt: 'Scss',
//                 isDone: false,
//             },
//             {
//                 id: '3dffsc',
//                 txt: 'Backend',
//                 isDone: false,
//             },
//         ],
//     },
//     {
//         id: 'PRBSD',
//         title: 'Sprint 3',
//         todos: [
//             {
//                 id: '34hgjc',
//                 txt: 'Vue',
//                 isDone: false,
//             },
//             {
//                 id: '3hvsc',
//                 txt: 'Css',
//                 isDone: true,
//             },
//             {
//                 id: '3bhjc',
//                 txt: 'Frontend',
//                 isDone: false,
//             },
//         ],
//     },
// ],

// {
//     id: 'a103',
//         title: 'Logo inspiration',
//             url: 'https://trimitiy.com/assets/images/logo/new-logo-white.png',
//                 createdAt: '1616155239874',
//                         },
// {
//     id: 'a104',
//         title: 'another logo option',
//             url: 'https://printfiam.com/wp-content/uploads/2020/02/contant-logo.png',
//                 createdAt: '16161455239874',
//                         },
// {
//     id: 'a105',
//         title: 'smile!',
//             url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Gnome-face-smile-big.svg/1024px-Gnome-face-smile-big.svg.png',
//                 createdAt: '1616152734274',
//                         },

var gBoards = []

export default {
    loadDemoBoard,
    getEmptyTask,
    getEmptyGroup,
    query,
    getTask,
    saveTask,
    removeTask,
    saveGroup,
    removeGroup
}

if (!localStorage.getItem(DB_KEY)) loadDemoBoard()


async function query(id) {
    const boards = await storageService.query(DB_KEY)
    gBoards = boards
    if (!id) return gBoards
    const board = boards.find(savedBoard => savedBoard._id === id)
    return board
}

async function getTask({ board, taskId }) {
    const group = board.groups.find(group => group.tasks.some(task => task.id === taskId))
    const task = group.tasks.find(task => task.id === taskId)
    if (task) return Promise.resolve(task)
    else return Promise.reject()
}

async function saveTask({ boardId, groupId, task }) {
    const board = gBoards.find(savedBoard => savedBoard._id === boardId)
    if (groupId) var group = board.groups.find(savedGroup => savedGroup.id === groupId)
    else group = board.groups.find(savedGroup => savedGroup.tasks.some(savedTask => savedTask.id === task.id))
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
    storageService.put(DB_KEY, board)
    return Promise.resolve({ board, task })
}

async function removeTask({ boardId, taskId }) {
    const board = gBoards.find(savedBoard => savedBoard._id === boardId)
    const group = board.groups.find(savedGroup => savedGroup.tasks.some(savedTask => savedTask.id === taskId))
    const taskIdx = group.tasks.findIndex((savedTask) => savedTask.id === taskId);
    if (taskIdx < 0) return;
    group.tasks.splice(taskIdx, 1);
    saveBoard(board)
    return Promise.resolve({ group, board })
}

function getEmptyTask() {
    return {
        title: '',
        description: '',
        //REMEMBER TO
        attachments: [],
        checklists: []
    }
}

async function getGroup({ board, taskId }) {
    console.log("file: board.service.js - line 483 - getGroup - taskId", taskId)
    //const board = gBoards.find(savedBoard => savedBoard._id === boardId)
    console.log("file: board.service.js - line 484 - getGroup - board", board)
    const group = board.groups.find(({ tasks }) => {
        return tasks.some(({ id }) => id === taskId);
    });
    console.log('group:', group);
    return group
}

async function saveGroup({ boardId, group }) {
    const board = gBoards.find(savedBoard => savedBoard._id === boardId)
    if (group.id) {//update
        console.log('Updating group', group);
        const groupIdx = board.groups.findIndex(({ id }) => id === group.id);
        board.groups.splice(groupIdx, 1, group);
    } else {//add
        console.log('Adding group', group);
        group.id = utilService.makeId();
        board.groups.push(group);
    }
    //localStorage.setItem(DB_KEY, JSON.stringify(gBoards))
    storageService.put(DB_KEY, board)
    return Promise.resolve(board)
}

async function removeGroup({ boardId, groupId }) {
    const board = gBoards.find(savedBoard => savedBoard._id === boardId)
    const idx = board.groups.findIndex(savedGroup => savedGroup.id === groupId)
    board.groups.splice(idx, 1)
    storageService.put(DB_KEY, board)
    return Promise.resolve(board)
}

function getEmptyGroup() {
    return {
        "title": "",
        "tasks": [
        ],
        "style": {}
    }
}

function loadDemoBoard() {
    localStorage.setItem(DB_KEY, JSON.stringify([DEMO_BOARD]))
}

function saveBoard(board) {
    if (board._id) {//update
        const idx = gBoards.findIndex(savedBoard => savedBoard._id === board._id)
        gBoards.splice(idx, 1, board)
        localStorage.setItem(DB_KEY, JSON.stringify(gBoards))
    } else {//add
        board._id = utilService.makeId()
        gBoards.push(board)
        localStorage.setItem(DB_KEY, JSON.stringify(gBoards))
    }
}


// function createTask({ type, content }) {

// }

// function getTask(id) {

// }

// function saveTask(task) {

// }

// function deleteTask() {

// }
