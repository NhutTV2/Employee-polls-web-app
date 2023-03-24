import { connect } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

import Poll from './Poll';

const HomePage = (props) => {
  const location = useLocation();
  const [pollType, setPollType] = useState('new');

  if (
    props.authedUser === undefined ||
    props.authedUser === null ||
    props.authedUser.id === undefined
  ) {
    return (
      <div className="container">
        <h3>You must login first.</h3>
        <Link state={{ path: location.pathname }} to="/login">
          Back to login page
        </Link>
      </div>
    );
  }

  const togglePoll = (type) => {
    setPollType(type);
  };

  return (
    <div className="container">
      <div className="grid-header-container">
        <div
          onClick={() => togglePoll('new')}
          className={
            pollType === 'new' ? 'poll-header active-header' : 'poll-header'
          }
        >
          New Polls
        </div>
        <div
          onClick={() => togglePoll('done')}
          className={
            pollType === 'done' ? 'poll-header active-header' : 'poll-header'
          }
        >
          Done Polls
        </div>
      </div>

      <div className="grid-container">
        {pollType === 'new'
          ? props.newPollsIds.map((id) => <Poll key={id} id={id} />)
          : props.donePollsIds.map((id) => <Poll key={id} id={id} />)}
      </div>
    </div>
  );
};

const mapStateToProps = ({ authedUser, polls }) => {
  if (authedUser === null) return { authedUser: null };

  let donePolls = [];
  let newPolls = [];

  Object.values(polls).forEach((poll) => {
    if (
      poll.answers.find((answer) => answer.user === authedUser.id) !== undefined
    ) {
      donePolls.push(poll.id);
    } else {
      newPolls.push(poll.id);
    }
  });

  return {
    authedUser,
    donePollsIds: donePolls.sort(
      (a, b) => polls[b].timestamp - polls[a].timestamp
    ),
    newPollsIds: newPolls.sort(
      (a, b) => polls[b].timestamp - polls[a].timestamp
    ),
  };
};

export default connect(mapStateToProps)(HomePage);
