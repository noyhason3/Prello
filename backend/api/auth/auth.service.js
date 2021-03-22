const bcrypt = require('bcrypt')
const userService = require('../user/user.service')
const logger = require('../../services/logger.service')

const USERS = [{
    username: 'Tal',
    fullname: 'Tal Tarablus',
    password: '1234',
    imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
},
{
    username: 'Noam',
    fullname: 'Noam Ben Yosef',
    password: '1234'

},
{
    username: 'Gabi1337',
    fullname: 'Gabi Amsalem',
    password: '1234',
    imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
},
{
    username: 'Efi',
    fullname: 'Efrat Kaminski',
    password: '1234',
    imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
},
{
    username: 'Dov',
    fullname: 'Dov Menashe',
    password: '1234',
    imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
},
{
    username: 'Benny',
    fullname: 'Biniamin Shemi',
    password: '1234',
    imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
},
{
    username: 'Keshet',
    fullname: 'Keshet Sheshet',
    password: '1234',
    imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
},
{
    username: 'Goni',
    fullname: 'Anna Avraham',
    password: '1234',
    imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
}]

registerDemoUsers()

async function login(username, password) {
    logger.debug(`auth.service - login with username: ${username}`)

    const user = await userService.getByUsername(username)
    if (!user) return Promise.reject('Invalid username or password')
    // TODO: un-comment for real login
    const match = await bcrypt.compare(password, user.password)
    if (!match) return Promise.reject('Invalid username or password')

    delete user.password
    return user
}

async function signup(username, password, fullname, imgUrl = null) {
    const saltRounds = 10

    logger.debug(`auth.service - signup with username: ${username}, fullname: ${fullname}`)
    if (!username || !password || !fullname) return Promise.reject('fullname, username and password are required!')

    const hash = await bcrypt.hash(password, saltRounds)
    // console.log("file: auth.service.js - line 76 - signup - hash", hash)
    return userService.add({ username, password: hash, fullname, imgUrl })
}

module.exports = {
    signup,
    login,
}



function registerDemoUsers() {
    USERS.forEach(user => {
        signup(user.username, user.password, user.fullname, user.imgUrl)
    })
}