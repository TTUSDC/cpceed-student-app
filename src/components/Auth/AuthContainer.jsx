// @flow
import React from 'react';

import * as server from 'server';
import {
  coordinator,
  student,
  AuthStates,
} from 'redux/actions.js';
import logger from 'logger.js';
import Auth from './components/Auth.jsx';

type Props = {
  // Handler for when the user wants to finish authenticating
  authFinished?: Function,
  // Handler for when the user wants to exit
  authCancelled: Function,
};

type State = {
  // Login Error
  logErr: string,
  // Registration Error
  regErr: string,
  // Waiting status that will change when XMLHttpRequest are in progress
  waiting: boolean,
}

// Handles requests to the server during production and fetching mocks in development
class AuthContainer extends React.Component<Props, State> {
  static defaultProps = {
    authFinished: null,
  };

  state = {
    logErr: '', // Login Error
    regErr: '', // Registration Error
    waiting: false,
  };

  handleRegister = (data: Object) => {
    const { COORDINATOR, STUDENT } = AuthStates;
    this.setState({
      ...this.state,
      waiting: true,
      regErr: '',
    });

    let userData = {
      email: '',
      name: '',
    }

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

    if (process.env.NODE_ENV === 'development') {
      logger.info('Hi-jacking user data in development. Here is what was passed');
      logger.info(userData);
    }

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

  handleLogin = (email: string, password: string) => {
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


export default AuthContainer;
