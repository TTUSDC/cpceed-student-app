import React from 'react';
import { render } from 'react-dom';
import './index.css';

import App from './App.jsx';

import registerServiceWorker from './registerServiceWorker';

render(<App />, document.getElementById('root'));

module.hot.accept('./App.jsx', () => {
  const NextRootContainer = App;
  render(<NextRootContainer />, document.getElementById('root'));
});

registerServiceWorker();
