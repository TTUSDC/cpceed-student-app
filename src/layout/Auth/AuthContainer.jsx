import React from 'react';
import PropTypes from 'prop-types';

import * as server from 'server';
import {
  coordinator,
  student,
  AuthStates,
} from 'redux/actions.js';
import logger from 'logger.js';
import { Auth } from './components';

class AuthContainer extends React.Component {
  state = {
    logErr: '',
    regErr: '',
    waiting: false,
  };

  handleRegister = (data) => {
    const { COORDINATOR, STUDENT } = AuthStates;
    this.setState({
      waiting: true,
      regErr: '',
    });

    let userData;
    switch (data.role) {
      case COORDINATOR:
        userData = coordinator;
        break;
      case STUDENT:
        userData = student;
        break;
      default:
        logger.error('Unknown user role in AuthContainer.js');
    }

    userData.email = data.email;
    userData.name = data.name;

    server.createUser(data)
      .then(() => {
        logger.info('User was registered');

        return server.login(data.email, data.password);
      })
      .then(() => {
        logger.info('User was logged in');

        if (this.props.authFinished) {
          this.props.authFinished();
        }
      })
      .catch((e) => {
        logger.error(e.message);
        this.setState({
          regErr: e.message,
          waiting: false,
        });
      });
  }

  handleLogin = (email, password) => {
    this.setState({
      waiting: true,
      logErr: '',
    });

    server.login(email, password)
      .then(() => {
        logger.info('User was logged in');

        if (this.props.authFinished) {
          this.props.authFinished();
        }
      })
      .catch((e) => {
        logger.error(e.message);
        this.setState({
          logErr: e.message,
          waiting: false,
        });
      });
  }

  render() {
    return (
      <Auth
        handleRegister={this.handleRegister}
        handleLogin={this.handleLogin}
        authCancelled={this.props.authCancelled}
        regErr={this.state.regErr}
        logErr={this.state.logErr}
        waiting={this.state.waiting}
      />
    );
  }
}

AuthContainer.propTypes = {
  authFinished: PropTypes.func,
  authCancelled: PropTypes.func.isRequired,
};

AuthContainer.defaultProps = {
  authFinished: null,
};

export default AuthContainer;
