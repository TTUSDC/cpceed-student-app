// @flow
import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  // Actions
  navigate,
  openAuthModal,
  closeAuthModal,
  // Types
  Permissions
} from 'redux/actions.js';
import { push } from 'connected-react-router';

import * as server from 'server';
import logger from 'logger.js';
import { NavBar } from './components';

type Props = {
  // Redux: User object
  user: {},
  // Determines whether or not the prompt is open
  showAuthModal: boolean,
  // Redux: Open Auth Modal
  openAuthModal: () => null,
  // Redux: Close Auth Modal
  closeAuthModal: () => null,
  // Redus: Navigation action from redux
  navigate: (url: string, permissions?: Permissions) => null,
};

class NavBarContainer extends React.Component<Props> {
  /*
    TODO: Let redux router handle this so that routing also becomes a function of state
    Navigates by pushing the relative URL to the router.

    NavBarContainer also handles the private routing.
    Declare private routes above
  */

  logout = () => {
    logger.info('Logging out...');
    server.logout()
      .then(() => {
        logger.info('User was logged out');
      })
      .catch((e) => {
        logger.error(e.message);
      });

    this.props.navigate('/');
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
        authStart={this.props.openAuthModal}
        authFinished={this.props.closeAuthModal}
        showAuthModal={this.props.showAuthModal}
        user={this.props.user}
        navigate={this.props.navigate}
        logout={this.logout}
      />
    );
  }
}

// Used by connect to map user to this.props.user
function mapStateToProps(state) {
  return {
    user: state.userReducer,
    showAuthModal: state.authReducer.openModal,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    navigate,
    openAuthModal,
    closeAuthModal,
  }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBarContainer);
