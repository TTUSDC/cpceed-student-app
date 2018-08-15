import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';

import createReduxWaitForMiddleware from 'redux-wait-for-action';

import thunk from 'redux-thunk';

import { createLogger } from 'redux-logger';

import cpceedApp from 'redux/reducers.js';

export const history = createBrowserHistory();
const logger = createLogger({
  // options
  level: 'info',
  diff: true,
  duratation: true,
  collapsed: true,
});

// store holds the redux store that allows app-wide state to be shared
const store = createStore(
  // Connecting the route reducers
  connectRouter(history)(cpceedApp),
  // initial state is an empty object literal
  {},
  // Applying middleware...
  compose(applyMiddleware(
    routerMiddleware(history),
    thunk,
    logger,
    createReduxWaitForMiddleware(),
  )),
);

export default store;
