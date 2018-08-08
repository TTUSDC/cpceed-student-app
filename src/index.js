// eslint-disable-file
import React from 'react';
import { hot } from 'react-hot-loader';
import { render } from 'react-dom';
import './index.css';

import App from './App.jsx';

import registerServiceWorker from './registerServiceWorker';

render(<App />, document.getElementById('root'));

if (process.env.NODE_ENV !== 'prod') {
  const Next = hot(module)(App);
  render(<Next />, document.getElementById('root'));
}

registerServiceWorker();
