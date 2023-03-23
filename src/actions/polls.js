import { getPolls, saveVote, savePoll } from '../utils/api';

export const RECEIVE_POLLS = 'RECEIVE_POLLS';
export const VOTE = 'VOTE';
export const CREATE_POLL = 'CREATE_POLL';

function receivePolls(polls) {
  return {
    type: RECEIVE_POLLS,
    polls,
  };
}

export function handleReceivePolls() {
  return (dispatch) => {
    return getPolls().then((polls) => dispatch(receivePolls(polls)));
  };
}

function vote(id, answer) {
  return {
    type: VOTE,
    id,
    answer,
  };
}

export function handleVote(id, answer) {
  return (dispatch) => {
    return saveVote({ id, answer }).then(() => dispatch(vote(id, answer)));
  };
}

function createPoll(poll) {
  return {
    type: CREATE_POLL,
    poll,
  };
}

export function handleCreatePoll(firstQuestion, secondQuestion, author) {
  return (dispatch) => {
    return savePoll(firstQuestion, secondQuestion, author).then((poll) =>
      dispatch(createPoll(poll))
    );
  };
}
