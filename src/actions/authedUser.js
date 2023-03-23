import { login, getAuthedUser, logout } from '../utils/api';

export const LOGIN = 'LOGIN';
export const RECEIVE_AUTHED_USER = 'RECEIVE_AUTHED_USER';
export const LOGOUT = 'LOGOUT';

function doLogin(authedUser) {
  return {
    type: LOGIN,
    authedUser,
  };
}

export function handleLogin(user) {
  return (dispatch) => {
    return login(user).then((authedUser) => dispatch(doLogin(authedUser)));
  };
}

function receiveAuthedUser(authedUser) {
  return {
    type: RECEIVE_AUTHED_USER,
    authedUser,
  };
}

export function handleReceiveAuthedUser() {
  return (dispatch) => {
    return getAuthedUser().then((authedUser) =>
      dispatch(receiveAuthedUser(authedUser))
    );
  };
}

function doLogout() {
  return {
    type: LOGOUT,
    authedUser: {},
  };
}

export function handleDoLogOut() {
  return (dispatch) => {
    return logout().then(() => dispatch(doLogout()));
  };
}
