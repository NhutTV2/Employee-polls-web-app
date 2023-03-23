import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Poll from './Poll';

const HomePage = (props) => {
  if (
    props.authedUser === undefined ||
    props.authedUser === null ||
    props.authedUser.id === undefined
  ) {
    return (
      <div className="container">
        <h3>You must login first.</h3>
        <Link to="/login">Back to login page</Link>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="poll-header">New Polls</div>
      <div className="grid-container">
        {props.inprogressPolls.map((id) => {
          return <Poll key={id} id={id} />;
        })}
      </div>
      <br />
      <br />
      <div className="poll-header">Done Polls</div>
      <div className="grid-container">
        {props.donePollIds.map((id) => {
          return <Poll key={id} id={id} />;
        })}
      </div>
    </div>
  );
};

const mapStateToProps = ({ authedUser, polls }) => {
  if (authedUser === null) return { authedUser: null };

  let donePolls = [];
  let inprogressPolls = [];

  Object.values(polls).forEach((poll) => {
    if (
      poll.answers.find((answer) => answer.user === authedUser.id) !== undefined
    ) {
      donePolls.push(poll.id);
    } else {
      inprogressPolls.push(poll.id);
    }
  });

  return {
    authedUser,
    donePollIds: donePolls.sort(
      (a, b) => polls[b].timestamp - polls[a].timestamp
    ),
    inprogressPolls: inprogressPolls.sort(
      (a, b) => polls[b].timestamp - polls[a].timestamp
    ),
  };
};

export default connect(mapStateToProps)(HomePage);
