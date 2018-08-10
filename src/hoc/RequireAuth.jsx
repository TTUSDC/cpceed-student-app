import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import AuthContainer from 'layout/Auth';

const requireAuth = (WrappedComponent, requiredState) => {
  class AuthWrapper extends WrappedComponent {
    authCancelled = () => {
      // If signin is cancelled, go back to the previous page
      this.props.history.goBack();
    }

    render() {
      let authorized = true;
      let output;

      // Checks if user has the required permissions
      Object.keys(requiredState).forEach((key) => {
        if (this.props.user.permissions[key] !== requiredState[key]) {
          authorized = false;
        }
      });

      // Depnding on whether the user has the required permissions
      if (authorized === true) {
        // Render the component
        output = super.render();
      } else {
        // Display the signin window
        output = <AuthContainer authCancelled={this.authCancelled} />;
      }

      return output;
    }
  }

  function mapStateToProps(state) {
    return {
      user: state.user,
    };
  }

  return withRouter(connect(mapStateToProps)(AuthWrapper));
};

export default requireAuth;
