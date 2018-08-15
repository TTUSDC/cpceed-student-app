import React from 'react';
import { hot } from 'react-hot-loader';
import { ConnectedRouter as Router } from 'connected-react-router';
import { Provider } from 'react-redux';

import { NavBarContainer, ContentContainer } from 'layout/';
import store, { history } from 'redux/store.js';

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: red,
  },
});

const App = () => (
  // Provider shares store with components joined by connect()
  <Provider store={store}>
    <Router history={history}>
      <MuiThemeProvider theme={theme}>
        <NavBarContainer />
        <ContentContainer />
      </MuiThemeProvider>
    </Router>
  </Provider>
);

export default hot(module)(App);
