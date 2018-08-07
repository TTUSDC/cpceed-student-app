import React from 'react';
import { HashRouter, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';

import NavBarContainer from 'layout/NavBar/NavBarContainer.jsx';
import { Events } from 'pages/Events';
import { Activity } from 'pages/Activity';
import { Settings } from 'pages/Settings';
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

        {/* Load the events page by default */}
        <Route
          exact
          path='/'
          render={() => (
            <Redirect to='/events' />
          )}
        />

        {/* Set the children of the primary component */}
        <Route path='/events' component={Events} />
        <Route path='/activity' component={Activity} />
        <Route path='/settings' component={Settings} />
      </MuiThemeProvider>
    </HashRouter>
  </Provider>
);

export default App;
