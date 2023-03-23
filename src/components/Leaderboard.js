import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Leaderboard = (props) => {
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

  const { users, polls } = props;

  const leaderboards = [];
  for (let userId in users) {
    let leaderboard = { id: Math.random() };
    leaderboard['username'] = users[userId].username;
    leaderboard['name'] = users[userId].name;
    leaderboard['avatarURL'] = users[userId].avatarURL;

    let countAnswer = 0;
    let countCreate = 0;

    for (let pollId in polls) {
      if (polls[pollId].author === users[userId].id) {
        countCreate++;
      }

      for (let answer of polls[pollId].answers) {
        if (answer.user === users[userId].id) {
          countAnswer++;
        }
      }

      leaderboard['countCreate'] = countCreate;
      leaderboard['countAnswer'] = countAnswer;
    }

    leaderboards.push(leaderboard);
  }

  return (
    <div className="container">
      <div className="leaderboard-grid">
        <div className="leaderboard-header">Users</div>
        <div className="leaderboard-header">Answered</div>
        <div className="leaderboard-header">Created</div>
      </div>
      {leaderboards.map((leaderboard) => (
        <div className="leaderboard-grid" key={leaderboard.id}>
          <div className="leaderboard-cell-user">
            <div className="leaderboard-user-avatar-grid">
              <img
                src={leaderboard.avatarURL}
                alt="user-avatar"
                className="leaderboard-user-avatar"
              />
            </div>
            <div className="leaderboard-name">{leaderboard.name}</div>
            <div className="leaderboard-user-name">{leaderboard.username}</div>
          </div>
          <div className="leaderboard-answer-created">
            {leaderboard.countAnswer}
          </div>
          <div className="leaderboard-answer-created">
            {leaderboard.countCreate}
          </div>
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = ({ users, polls, authedUser }) => ({
  users,
  polls,
  authedUser,
});

export default connect(mapStateToProps)(Leaderboard);
