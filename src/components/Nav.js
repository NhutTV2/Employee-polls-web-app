import { connect } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { handleDoLogOut } from '../actions/authedUser';

const Nav = (props) => {
  const navigate = useNavigate();

  const handleLogOut = () => {
    props.dispatch(handleDoLogOut());
    navigate('/login');
  };

  return (
    <div className="container">
      <div className="nav-container">
        <div className="left-btns">
          <Link to="/home" className="nav-btn">
            Home
          </Link>
          <Link to="/leaderboard" className="nav-btn">
            Leaderboard
          </Link>
          <Link to="/add" className="nav-btn">
            New
          </Link>
        </div>
        <div className="right-btns">
          {props.authedUser !== null &&
            props.authedUser !== undefined &&
            props.authedUser.id !== undefined && (
              <div className="nav-avatar">
                <span>{props.authedUser.name}</span>
              </div>
            )}
          <div className="nav-btn" onClick={handleLogOut}>
            Logout
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ authedUser }) => ({ authedUser });

export default connect(mapStateToProps)(Nav);
