import React from 'react';
import { render } from 'react-dom';
import { hot } from 'react-hot-loader';
import './index.css';

// Ensures that Grommet styles are applied to the entire app
import 'styles/grommet.scss';
import App from './App.jsx';

import registerServiceWorker from './registerServiceWorker';

render(<App/>, document.getElementById('root'))

module.hot.accept('./App.jsx', () => {
  const NextRootContainer = require('./App.jsx').default
  render(<NextRootContainer/>, document.getElementById('root'));
})

registerServiceWorker();
