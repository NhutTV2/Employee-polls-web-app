import { combineReducers } from 'redux';
import users from './users';
import authedUser from './authedUser';
import polls from './polls';

const reducer = combineReducers({ users, authedUser, polls });

export default reducer;
