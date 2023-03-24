import { connect } from 'react-redux';
import { useLocation, useNavigate, useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { handleVote } from '../actions/polls';

const withRouter = (Component) => {
  return (props) => {
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  };
};

const PollPage = (props) => {
  const location = useLocation();
  const [answer, setAnswer] = useState(
    props.poll === undefined
      ? null
      : props.poll.answers.find((answer) => answer.user === props.authedUser.id)
  );

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

  if (!props.poll) {
    return (
      <div className="container">
        <p>This poll doesn't exist</p>
        <Link to="/home">Back to home page</Link>
      </div>
    );
  }

  const handleChoose = (e, choose) => {
    e.preventDefault();
    const newAnswer = { choose, user: props.authedUser.id };
    props.dispatch(handleVote(props.id, newAnswer));
    setAnswer(newAnswer);
  };

  const getVoteInformation = (answers, choose) => {
    const chooseCount = answers.filter(
      (answer) => answer.choose === choose
    ).length;
    const totalVote = answers.length;
    return `${chooseCount} people (${
      totalVote !== 0 ? Math.round((chooseCount / totalVote) * 100) : 0
    }%) voted`;
  };

  return (
    <div className="container">
      <h2>Poll by {props.user.name}</h2>
      <img src={props.user.avatarURL} alt="avatar" className="avatar" />
      <h3>Would You Rather</h3>
      <div className="questions-container">
        <div className="question-content">
          {props.poll.firstQuestion}
          <p>{getVoteInformation(props.poll.answers, 1)}</p>
        </div>
        <div className="question-content">
          {props.poll.secondQuestion}
          <p>{getVoteInformation(props.poll.answers, 2)}</p>
        </div>
        {answer === undefined && (
          <div>
            <button
              className="btn-vote"
              id="first-question"
              onClick={(e) => handleChoose(e, 1)}
            >
              Vote
            </button>
          </div>
        )}
        {answer === undefined && (
          <div>
            <button
              className="btn-vote"
              id="second-question"
              onClick={(e) => handleChoose(e, 2)}
            >
              Vote
            </button>
          </div>
        )}
        {answer !== undefined && (
          <div>
            <button
              className={
                answer.choose === 1 ? 'btn-vote choose' : 'btn-vote not-choose'
              }
            >
              Vote
            </button>
          </div>
        )}
        {answer !== undefined && (
          <div>
            <button
              className={
                answer.choose === 2 ? 'btn-vote choose' : 'btn-vote not-choose'
              }
            >
              Vote
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ authedUser, polls, users }, props) => {
  if (authedUser === null) return { authedUser };
  const { id } = props.router.params;
  const poll = { ...polls }[id];
  if (poll === undefined) return { authedUser, poll };
  const user = { ...users }[poll.author];
  return { id, authedUser, poll, user };
};

export default withRouter(connect(mapStateToProps)(PollPage));
