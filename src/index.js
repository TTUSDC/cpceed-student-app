// eslint-disable-file
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import logger from 'logger.js';
import App from './App.jsx';

import registerServiceWorker from './registerServiceWorker';


if (process.env.NODE_ENV === 'development') logger.info('In development mode');

ReactDOM.render(<App />, document.getElementById('root'));

registerServiceWorker();
