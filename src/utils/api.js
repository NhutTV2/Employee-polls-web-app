import {
  _getUsers,
  _getPolls,
  _getAuthedUser,
  _login,
  _saveVote,
  _savePoll,
  _logout,
} from './_DATA';

export function getUsers() {
  return _getUsers();
}

export function getPolls() {
  return _getPolls();
}

export function getAuthedUser() {
  return _getAuthedUser();
}

export function login(user) {
  return _login(user);
}

export function saveVote({ id, answer }) {
  return _saveVote({ id, answer });
}

export function savePoll(firstQuestion, secondQuestion, author) {
  return _savePoll(firstQuestion, secondQuestion, author);
}

export function logout() {
  return _logout();
}
