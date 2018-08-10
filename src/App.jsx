import React from 'react';
import { hot } from 'react-hot-loader';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { NavBarContainer, ContentContainer } from 'layout/';
import store from 'redux/store.js';

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
    <HashRouter>
      <MuiThemeProvider theme={theme}>
        <NavBarContainer />
        <ContentContainer />
      </MuiThemeProvider>
    </HashRouter>
  </Provider>
);

export default hot(module)(App);
