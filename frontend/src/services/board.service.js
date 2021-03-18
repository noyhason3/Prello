import utilService from "./util.service";

export default {
    getDemoBoard,
    getEmptyTask,
}


function getDemoBoard() {
    return gBoard;
}

const gBoard = {
    "_id": "b101",
    "title": "Robot dev proj",
    "createdAt": 1589983468418,
    "createdBy": {
        "_id": "u101",
        "fullname": "Abi Abambi",
        "imgUrl": "http://some-img"
    },
    "style": {},
    "labels": [
        {
            "id": "l101",
            "title": "Done",
            "color": "#61bd4f"
        },
        {
            "id": "l102",
            "title": "",
            "color": "#9B6969"
        },
        {
            "id": "l103",
            "title": "",
            "color": "#7FFaD4"
        },
        {
            "id": "l104",
            "title": "On hold",
            "color": "#f66f6f"
        }
    ],
    "members": [
        {
            "_id": "u101",
            "fullname": "Tal Tarablus",
            "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
        }
    ],
    "groups": [
        {
            "id": "g101",
            "title": "Group 1",
            "tasks": [
                {
                    "id": "c101",
                    "title": "Replace logo",
                    "checklists": []
                },
                {
                    "id": "c102",
                    "title": "Add Samples",
                    "checklists": [
                        {
                            "id": "PRBYH",
                            "title": "Sprint 4",
                            "todos": [
                                {
                                    "id": "34fsc",
                                    "txt": "Vuex",
                                    "isDone": true
                                },
                                {
                                    "id": "3sdfrc",
                                    "txt": "Scss",
                                    "isDone": false
                                },
                                {
                                    "id": "3dffsc",
                                    "txt": "Backend",
                                    "isDone": false
                                }
                            ]
                        },
                        {
                            "id": "PRBSD",
                            "title": "Sprint 3",
                            "todos": [
                                {
                                    "id": "34hgjc",
                                    "txt": "Vue",
                                    "isDone": false
                                },
                                {
                                    "id": "3hvsc",
                                    "txt": "Css",
                                    "isDone": true
                                },
                                {
                                    "id": "3bhjc",
                                    "txt": "Frontend",
                                    "isDone": false
                                }
                            ]
                        }
                    ],
                }
            ],
            "style": {}
        },
        {
            "id": "g102",
            "title": "Group 2",
            "tasks": [
                {
                    "id": "c103",
                    "title": "Do that",
                    "checklists": []
                },
                {
                    "id": "c104",
                    "title": "Help me",
                    "description": "description",
                    "comments": [
                        {
                            "id": "ZdPnm",
                            "txt": "also @yaronb please CR this",
                            "createdAt": 1590999817436.0,
                            "byMember": {
                                "_id": "u101",
                                "fullname": "Tal Tarablus",
                                "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                            }
                        }
                    ],
                    "checklists": [
                        {
                            "id": "YEhmF",
                            "title": "Checklist",
                            "todos": [
                                {
                                    "id": "212jX",
                                    "txt": "To Do 1",
                                    "isDone": false
                                }
                            ]
                        }
                    ],
                    "members": [
                        {
                            "_id": "u101",
                            "username": "Tal",
                            "fullname": "Tal Tarablus",
                            "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                        }
                    ],
                    "labelIds": ["l101", "l102"],
                    "createdAt": 1590999730348,
                    "dueDate": 16156215211,
                    "byMember": {
                        "_id": "u101",
                        "username": "Tal",
                        "fullname": "Tal Tarablus",
                        "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                    },
                    "style": {
                        "bgColor": "#26de81"
                    }
                }
            ],
            "style": {}
        }
    ],
    "activities": [
        {
            "id": "a101",
            "txt": "Changed Color",
            "createdAt": 154514,
            "byMember": {
                "_id": "u101",
                "fullname": "Abi Abambi",
                "imgUrl": "http://some-img"
            },
            "task": {
                "id": "c101",
                "title": "Replace Logo"
            }
        }
    ]
}

function getEmptyTask() {
    return {
        title: '',
        description: '',
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