// @flow
import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import * as server from 'server';
import logger from 'logger.js';
import { NavBar } from './components';

type Props = {
  user: Object,
  history: { push: (string) => null },
};

class NavBarContainer extends React.Component<Props> {
  /*
    TODO: Let redux router handle this so that routing also becomes a function of state
    Navigates by pushing the relative URL to the router.

    navigate needs to be wrapped in an arrow function before being passed
    to onClick because it has a custom parameter. onClick only passes an
    event, so it won't know how to supply other parameters. But you can't
    add parentheses to navigate because that would call it rather than
    passing it as a variable. Arrow functions allow navigate to have
    parentheses because they wrap it in a variable, so the function call
    doesn't happen until the variable is called as a function.
  */
  navigate = (url) => {
    this.props.history.push(url);
  }

  logout = () => {
    logger.info('Logging out...');
    server.logout()
      .then(() => {
        logger.info('User was logged out');
      })
      .catch((e) => {
        logger.error(e.message);
      });

    this.props.history.push('/');
  }

  render() {
    return (
      /*
        As a presenter, NavBar.js isn't allowed to modify data; this
        includes the router. To maintain the paradigm, the navigate
        function is passed to NavBar.js as a prop. When it is called
        from NavBar.js, the context switches back to NavBarContainer.js.
      */
      <NavBar
        user={this.props.user}
        navigate={this.navigate}
        logout={this.logout}
      />
    );
  }
}

// Used by connect to map user to this.props.user
function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default withRouter(connect(mapStateToProps)(NavBarContainer));
