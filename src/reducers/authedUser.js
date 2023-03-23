import { LOGIN, RECEIVE_AUTHED_USER, LOGOUT } from '../actions/authedUser';

export default function authedUser(state = null, action) {
  switch (action.type) {
    case LOGIN:
      return { ...state, ...action.authedUser };
    case RECEIVE_AUTHED_USER:
      return { ...state, ...action.authedUser };
    case LOGOUT:
      return action.authedUser;
    default:
      return state;
  }
}
