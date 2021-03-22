import { httpService } from './http.service';

export const authService = {
  login,
  logout,
  signup,
};

window.userService = userService;
// Note: due to async, must run one by one...
// userService.signup({fullname: 'Puki Norma', username: 'user1', password:'123',score: 100, isAdmin: false})
// userService.signup({fullname: 'Master Adminov', username: 'admin', password:'123', score: 100, isAdmin: true})
// userService.signup({fullname: 'Muki G', username: 'muki', password:'123', score: 100})


async function login(userCred) {
  const user = await httpService.post('auth/login', userCred);
  if (user) return _saveLocalUser(user);
}

async function signup(userCred) {
  const user = await httpService.post('auth/signup', userCred);
  return _saveLocalUser(user);
}

async function logout() {
  return await httpService.post('auth/logout');
}

function _saveLocalUser(user) {
  sessionStorage.setItem('loggedinUser', JSON.stringify(user));
  return user;
}
