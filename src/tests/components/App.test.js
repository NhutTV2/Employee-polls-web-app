import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import App from '../../components/App';
import { createStore } from 'redux';
import reducer from '../../reducers';
import middleware from '../../middleware';
import { MemoryRouter } from 'react-router-dom';

const store = createStore(reducer, middleware);

describe('Snapshot testing App component', () => {
  it('Will match the snapshot', () => {
    const { component } = render(
      <Provider store={store}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </Provider>
    );
    expect(component).toMatchSnapshot();
  });
});
