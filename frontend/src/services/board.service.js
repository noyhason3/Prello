import utilService from "./util.service";
import storageService from './async-storage-service.js'

const DB_KEY = 'boards_db'
const DEMO_BOARD = {
    "_id": "b101",
    "title": "Robot dev proj",
    "createdAt": 1589983468418,
    "createdBy": {
        "_id": "u101",
        "fullname": "Abi Abambi",
        "imgUrl": "http://some-img"
    },
    style: {},
    labels: [
        {
            id: 'l101',
            title: 'Done',
            color: '#0079BF',
        },
        {
            id: 'l102',
            title: '',
            color: '#F2D600',
        },
        {
            id: 'l103',
            title: '',
            color: '#51E898',
        },
        {
            id: 'l104',
            title: 'On hold',
            color: '#EB5A46',
        },
    ],
    members: [
        {
            _id: 'u101',
            fullname: 'Tal Tarablus',
            imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
        },
        {
            _id: 'u102',
            fullname: 'Noam Ben Yosef',
        },
        {
            _id: 'u103',
            fullname: 'Gabi Amsalem',
            imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
        },
    ],
    groups: [
        {
            id: 'g101',
            title: 'Group 1',
            tasks: [
                {
                    id: 'c101',
                    title: 'Replace logo',
                    checklists: [],
                    members: [
                        {
                            _id: 'u101',
                            username: 'Efi',
                            fullname: 'Efrat Kaminski',
                            imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                        },

                        {
                            _id: 'u101',
                            username: 'Dov',
                            fullname: 'Dov Menashe',
                            imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                        },
                    ],
                    attachments: [
                        {
                            id: 'a101',
                            name: 'Logo inspiration',
                            url: 'https://trimitiy.com/assets/images/logo/new-logo-white.png',
                            createdAt: '1616155239874',
                        },
                        {
                            id: 'a102',
                            name: 'another logo option',
                            url: 'https://printfiam.com/wp-content/uploads/2020/02/contant-logo.png',
                            createdAt: '16161455239874',
                        },
                        {
                            id: 'a103',
                            name: 'smile!',
                            url:
                                'https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Gnome-face-smile-big.svg/1024px-Gnome-face-smile-big.svg.png',
                            createdAt: '1616152734274',
                        },
                    ],
                },
                {
                    id: 'c102',
                    title: 'Add Samples',
                    checklists: [
                        {
                            id: 'PRBYH',
                            title: 'Sprint 4',
                            todos: [
                                {
                                    id: '34fsc',
                                    txt: 'Vuex',
                                    isDone: true,
                                },
                                {
                                    id: '3sdfrc',
                                    txt: 'Scss',
                                    isDone: false,
                                },
                                {
                                    id: '3dffsc',
                                    txt: 'Backend',
                                    isDone: false,
                                },
                            ],
                        },
                        {
                            id: 'PRBSD',
                            title: 'Sprint 3',
                            todos: [
                                {
                                    id: '34hgjc',
                                    txt: 'Vue',
                                    isDone: false,
                                },
                                {
                                    id: '3hvsc',
                                    txt: 'Css',
                                    isDone: true,
                                },
                                {
                                    id: '3bhjc',
                                    txt: 'Frontend',
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
            title: 'Group 2',
            tasks: [
                {
                    id: 'c103',
                    title: 'Do that',
                    checklists: [],
                    attachments: [],
                },
                {
                    id: 'c104',
                    title: 'Help me',
                    description: 'description',
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
                            title: 'Checklist',
                            todos: [
                                {
                                    id: '212jX',
                                    txt: 'To Do 1',
                                    isDone: false,
                                },
                            ],
                        },
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
                            _id: 'u101',
                            username: 'Benny',
                            fullname: 'Biniamin Shemi',
                            imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                        },
                    ],
                    labelIds: ['l101', 'l102'],
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
            id: 'RURY',
            title: 'Group 1',
            tasks: [
                {
                    id: 'DGY',
                    title: 'Replace logo',
                    checklists: [],
                    attachments: [],
                },
                {
                    id: 'RTY',
                    title: 'Add Samples',
                    checklists: [],
                    attachments: [],
                },
            ],
            style: {},
        },
        {
            id: 'DGHG',
            title: 'Group 1',
            tasks: [
                {
                    id: 'THDG',
                    title: 'Replace logo',
                    checklists: [],
                    attachments: [],
                },
                {
                    id: 'DFHJ',
                    title: 'Add Samples',
                    checklists: [
                        {
                            id: 'MGFH',
                            title: 'Sprint 4',
                            todos: [
                                {
                                    id: 'SGHT',
                                    txt: 'Vuex',
                                    isDone: true,
                                },
                                {
                                    id: 'DHHR',
                                    txt: 'Scss',
                                    isDone: false,
                                },
                                {
                                    id: 'JKGB',
                                    txt: 'Backend',
                                    isDone: false,
                                },
                            ],
                        },
                        {
                            id: 'SRYSB',
                            title: 'Sprint 3',
                            todos: [
                                {
                                    id: 'DHDN',
                                    txt: 'Vue',
                                    isDone: false,
                                },
                                {
                                    id: 'DHGN',
                                    txt: 'Css',
                                    isDone: true,
                                },
                                {
                                    id: 'JGFD',
                                    txt: 'Frontend',
                                    isDone: false,
                                },
                            ],
                        },
                    ],
                    attachments: [],
                    members: [
                        {
                            _id: 'u101',
                            username: 'Keshet',
                            fullname: 'Keshet Sheshet',
                            imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                        },
                        {
                            _id: 'u103',
                            username: 'Goni',
                            fullname: 'Anna Avraham',
                            imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                        },
                        {
                            _id: 'u103',
                            username: 'Gabi',
                            fullname: 'Gabi Amsalem',
                            imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                        },
                    ],
                },
            ],
            style: {},
        },
        {
            id: 'FJD',
            title: 'Group 1',
            tasks: [
                {
                    id: 'GHHF',
                    title: 'Replace logo',
                    checklists: [],
                    attachments: [],
                },
                {
                    id: 'G4HF',
                    title: 'Add Samples',
                    checklists: [
                        {
                            id: 'T5TJH',
                            title: 'Sprint 4',
                            todos: [
                                {
                                    id: '5T5GT',
                                    txt: 'Vuex',
                                    isDone: true,
                                },
                                {
                                    id: 'RTSD',
                                    txt: 'Scss',
                                    isDone: false,
                                },
                                {
                                    id: 'LJK',
                                    txt: 'Backend',
                                    isDone: false,
                                },
                            ],
                        },
                        {
                            id: 'PFGD',
                            title: 'Sprint 3',
                            todos: [
                                {
                                    id: 'DGH',
                                    txt: 'Vue',
                                    isDone: false,
                                },
                                {
                                    id: 'FHG',
                                    txt: 'Css',
                                    isDone: true,
                                },
                                {
                                    id: 'SDF',
                                    txt: 'Frontend',
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
                "id": "c101",
                "title": "Replace Logo"
            }
        }
    ]
}

var gBoards = []

export default {
    loadDemoBoard,
    getEmptyTask,
    getEmptyGroup,
    query,
    saveTask,
    removeTask
}

if (!localStorage.getItem(DB_KEY)) loadDemoBoard()


async function query(id) {
    const boards = await storageService.query(DB_KEY)
    gBoards = boards
    if (!id) return gBoards
    const board = boards.find(savedBoard => savedBoard._id === id)
    return board
}


async function saveTask({ boardId, task }) {
    const board = gBoards.find(savedBoard => savedBoard._id === boardId)
    const group = board.groups.find((group) => group.id === task.group.id);
    delete task.group
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
    return Promise.resolve({ boardAns: board, taskAns: task })
}

async function removeTask({ boardId, task }) {
    const { id, inGroup } = task
    const board = gBoards.find(savedBoard => savedBoard._id === boardId)
    const group = board.groups.find(savedGroup => savedGroup.id === inGroup)
    const taskIdx = group.tasks.findIndex((savedTask) => savedTask.id === id);
    if (taskIdx < 0) return;
    group.tasks.splice(taskIdx, 1);
    saveBoard(board)
    return Promise.resolve({ group, board })
}

function getEmptyTask() {
    return {
        title: '',
        description: '',
    }
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
