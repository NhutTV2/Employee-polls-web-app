import { connect } from 'react-redux';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { handleLogin } from '../actions/authedUser';
import logo from '../images/login-background.png';

const LoginPage = (props) => {
  const navigate = useNavigate();
  const location = useLocation();

  if (props.authedUser && props.authedUser.id) {
    navigate('/home');
  }

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginFail, setLoginFail] = useState(false);

  const handleOnChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const handleOnChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    let authedUser = { ...props.users[username] };
    if (authedUser.password !== password) {
      authedUser = undefined;
      setLoginFail(true);
      return;
    }

    props.dispatch(handleLogin(authedUser));
    setLoginFail(false);
    setUsername('');
    setPassword('');
    navigate(location.state?.path || '/home');
  };

  return (
    <div className="container">
      <img src={logo} className="login-img" alt="survey-background" />
      <h2>Log In</h2>
      <form className="container" onSubmit={handleOnSubmit}>
        <h3>User</h3>
        <input
          data-testid="username"
          type="text"
          className="input"
          placeholder="username"
          value={username}
          onChange={handleOnChangeUsername}
        />
        <h3>Password</h3>
        <input
          data-testid="password"
          type="password"
          className="input"
          placeholder="password"
          value={password}
          onChange={handleOnChangePassword}
        />
        {loginFail && (
          <p data-testid="error-msg" className="error-message">
            Invalid username or password
          </p>
        )}
        <button
          data-testid="login-btn"
          type="submit"
          className="btn-submit"
          disabled={username === '' || password === ''}
        >
          Login
        </button>
      </form>
    </div>
  );
};

const mapStateToProps = ({ authedUser, users }) => ({
  authedUser,
  users,
});

export default connect(mapStateToProps)(LoginPage);
