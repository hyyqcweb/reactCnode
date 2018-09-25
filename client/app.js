import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader' // eslint-disable-line
import App from './App.jsx';

// ReactDOM.render(<App/>,document.getElementById('root'));

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('root'),
  );
};

render(App);

if (module.hot) {
  module.hot.accept('./App.jsx', () => {
    const NextApp = require('./App.jsx').default; // eslint-disable-line
    // ReactDOM.render(<NextApp/>,document.getElementById('root'));
    render(NextApp);
  });
}
