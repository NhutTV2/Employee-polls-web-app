import { connect } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { handleReceiveUsers } from '../actions/users';
import { handleReceivePolls } from '../actions/polls';
import { handleReceiveAuthedUser } from '../actions/authedUser';
import LoginPage from './LoginPage';
import HomePage from './HomePage';
import PollPage from './PollPage';
import Leaderboard from './Leaderboard';
import CreatePage from './CreatePage';
import Nav from './Nav';

function App(props) {
  useEffect(() => {
    props.dispatch(handleReceiveUsers());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    props.dispatch(handleReceivePolls());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    props.dispatch(handleReceiveAuthedUser());
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Nav />
      <Routes>
        <Route path="/" exact element={<LoginPage />} />
        <Route path="/login" exact element={<LoginPage />} />
        <Route path="/home" exact element={<HomePage />} />
        <Route path="/question/:id" exact element={<PollPage />} />
        <Route path="/leaderboard" exact element={<Leaderboard />} />
        <Route path="/add" exact element={<CreatePage />} />
      </Routes>
    </div>
  );
}

export default connect()(App);
