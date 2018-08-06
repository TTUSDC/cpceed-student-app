import React from 'react';
import { render } from 'react-dom';
import { hot } from 'react-hot-loader';

// Ensures that Grommet styles are applied to the entire app
import 'styles/grommet.scss';
import App from './App.jsx';

render(<App/>, document.getElementById('app'))

module.hot.accept('./App.jsx', () => {
  const NextRootContainer = require('./App.jsx').default
  render(<NextRootContainer/>, document.getElementById('app'));
})

