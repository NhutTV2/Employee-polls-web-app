import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Poll = (props) => {
  const date = new Date(props.poll.timestamp);
  const formattedDate = `${date.getHours()}:${date.getMinutes()} | ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;

  const navigate = useNavigate();
  const toPollDetail = (e, id) => {
    e.preventDefault();
    navigate(`/question/${id}`);
  };

  return (
    <div className="poll-item">
      <div className="poll-item-container">
        <p className="username-para">{props.poll.author}</p>
        <p className="time-para">{formattedDate}</p>
        <hr />
        <button
          className="btn-show"
          onClick={(e) => toPollDetail(e, props.poll.id)}
        >
          Show
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = ({ polls }, { id }) => {
  const poll = polls[id];
  return { poll: poll ? poll : null };
};

export default connect(mapStateToProps)(Poll);
