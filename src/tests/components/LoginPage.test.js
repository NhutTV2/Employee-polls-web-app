/* eslint-disable testing-library/prefer-screen-queries */
import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoginPage from '../../components/LoginPage';
import { MemoryRouter } from 'react-router-dom';
import { createStore } from 'redux';
import reducer from '../../reducers';
import middleware from '../../middleware';
import { Provider } from 'react-redux';
import { getUsers } from '../../utils/api';
import { receiveUsers } from '../../actions/users';
import { act } from 'react-dom/test-utils';

const store = createStore(reducer, middleware);

describe('Testing Login component', () => {
  beforeAll(async () => {
    await getUsers().then((data) =>
      act(() => {
        store.dispatch(receiveUsers(data));
      })
    );
  });

  it('Will match snapshot', () => {
    const { component } = render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );
    expect(component).toMatchSnapshot();
  });

  it('Will display error message if username is wrong', () => {
    // eslint-disable-next-line testing-library/render-result-naming-convention
    const component = render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );
    const usernameInput = component.getByTestId('username');
    fireEvent.change(usernameInput, { target: { value: 'hello' } });
    const passwordInput = component.getByTestId('password');
    fireEvent.change(passwordInput, { target: { value: 'sarah_edo' } });
    const loginBtn = component.getByTestId('login-btn');
    fireEvent.click(loginBtn);
    expect(component.getByTestId('error-msg')).toBeInTheDocument();
  });

  it('Will display error message if password is wrong', () => {
    // eslint-disable-next-line testing-library/render-result-naming-convention
    const component = render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );
    const usernameInput = component.getByTestId('username');
    fireEvent.change(usernameInput, { target: { value: 'sarah_edo' } });
    const passwordInput = component.getByTestId('password');
    fireEvent.change(passwordInput, { target: { value: 'hello' } });
    const loginBtn = component.getByTestId('login-btn');
    fireEvent.click(loginBtn);
    expect(component.getByTestId('error-msg')).toBeInTheDocument();
  });

  it('Will display error message if username and password is match', () => {
    // eslint-disable-next-line testing-library/render-result-naming-convention
    const component = render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );
    const usernameInput = component.getByTestId('username');
    fireEvent.change(usernameInput, { target: { value: 'sarah_edo' } });
    const passwordInput = component.getByTestId('password');
    fireEvent.change(passwordInput, { target: { value: 'sarah_edo' } });
    const loginBtn = component.getByTestId('login-btn');
    fireEvent.click(loginBtn);
    expect(component.queryByTestId('error-msg')).not.toBeInTheDocument();
  });
});
