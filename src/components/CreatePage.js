import { useState } from 'react';
import { handleCreatePoll } from '../actions/polls';
import { connect } from 'react-redux';
import { useNavigate, Link, useLocation } from 'react-router-dom';

const CreatePage = (props) => {
  const [optionOne, setOptionOne] = useState('');
  const [optionTwo, setOptionTwo] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

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

  const onChangeOptionOne = (e) => {
    const value = e.target.value;
    setOptionOne(value);
  };

  const onChangeOptionTwo = (e) => {
    const value = e.target.value;
    setOptionTwo(value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    props.dispatch(handleCreatePoll(optionOne, optionTwo, props.authedUser.id));
    navigate('/home');
  };

  return (
    <div className="container">
      <h2>Would You Rather</h2>
      <h4>Create Your Own Poll</h4>
      <form className="container" onSubmit={onSubmitHandler}>
        <h3>First Option</h3>
        <input
          type="text"
          className="input"
          placeholder="Option One"
          value={optionOne}
          onChange={onChangeOptionOne}
        />
        <h3>Second Option</h3>
        <input
          type="text"
          className="input"
          placeholder="Option Two"
          value={optionTwo}
          onChange={onChangeOptionTwo}
        />
        <button className="btn-submit" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

const mapStateToProps = ({ authedUser }) => ({
  authedUser,
});

export default connect(mapStateToProps)(CreatePage);
