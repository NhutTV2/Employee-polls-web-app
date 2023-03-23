import { RECEIVE_POLLS, VOTE, CREATE_POLL } from '../actions/polls';

export default function polls(state = {}, action) {
  switch (action.type) {
    case RECEIVE_POLLS:
      return { ...state, ...action.polls };
    case VOTE:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          answers: state[action.id].answers.concat([action.answer]),
        },
      };
    case CREATE_POLL:
      return { ...state, [action.poll.id]: action.poll };
    default:
      return state;
  }
}
