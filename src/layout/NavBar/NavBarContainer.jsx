// @flow
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  // Types
  Permissions,
  // Actions
  navigate,
  startNavigation,
  endNavigation,
  openAuthModal,
  closeAuthModal,
} from 'redux/actions/navigationActions';
import { push } from 'connected-react-router';

import * as server from 'server';
import logger from 'logger.js';
import { NavBar } from './components';

type Props = {
  // Redux-State: User object
  user: {},
  // Redux-State: The page that the user wants to go to
  nextPage?: string,
  // Redux-State: Determines whether or not the prompt is open
  showAuthModal: boolean,
  // Redux-State: Determines if the user has proper permissions to access the page
  isAuthenticated: boolean,

  // Connected-Router: Pushes to the given url
  push: (url: string) => null,

  // Redux-Action: Open Auth Modal
  openAuthModal: () => null,
  // Redux-Action: Close Auth Modal with an optional new user
  closeAuthModal: (user?: {}) => Promise<null>,
  // Redux-Action: Signals redux to start navigation
  startNavigation: (url: string, restrictions?: Permissions) => null,
  // Redux-Action: Signals redux to stop the navigation by clearing nextPage,
  // closing the modal and clear isAuthenticated
  endNavigation: () => null,
};

class NavBarContainer extends React.Component<Props> {
  static defaultProps = {
    nextPage: null,
  }

  /**
   * Allow the user to continue to the requested URL when they have
   * the correct permissions and the nextPage prop
   *
   * Will not run when the nextPage prop is cleared at the end of the
   * cycle
   */
  componentDidUpdate() {
    const { nextPage, isAuthenticated, endNavigation } = this.props;
    if (nextPage && isAuthenticated) {
      console.log('user is authenticated and now moving to next page')
      this.navigate(nextPage);
      endNavigation()
    }
  }

  /**
   * Navigates by pushing the relative URL to the router.
   * NavBarContainer also handles the private routing.
   * Declare private routes above
   */
  navigate = (url: string, restrictions?: Permissions) => {
    const { startNavigation, push } = this.props;
    if (!restrictions) {
      push(url)
    } else {
      console.log('starting navigation for private route', url)
      startNavigation(url, restrictions)
    }
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

    this.navigate('/');
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
        navigate={this.navigate}
        logout={this.logout}
      />
    );
  }
}

// Used by connect to map user to this.props.user
const mapStateToProps = (state) => {
  // State originating from the Navigation Reducer
  const { showAuthModal, nextPage, navigationChange } = state.navigationReducer;

  // State originating from the User Reducer
  const { user, isAuthenticated } = state.userReducer;

  return { showAuthModal, nextPage, isAuthenticated, user }
}

const  mapDispatchToProps = (dispatch) => bindActionCreators({
  push,
  startNavigation,
  endNavigation,
  openAuthModal,
  closeAuthModal,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBarContainer);
