// TODO: Currently broken since firebase is not setup
// Are we going to change this anytime soon?
// @flow
import React from 'react';
import * as firebase from 'firebase';
import { connect } from 'react-redux';
import update from 'immutability-helper';
import logger from 'logger.js';

import { updateUser } from 'redux/actions.js';
import { Account } from './components';

type Props = {
  user: Object,
  dispatch: (Object) => null,
};

type State = {
  err: {
    email: string,
    password: string,
  },
  waiting: {
    email: boolean,
    password: boolean,
  },
}

class AccountContainer extends React.Component<Props, State> {
  state = {
    err: {
      email: '',
      password: '',
    },
    waiting: {
      email: false,
      password: false,
    },
  };

  handlePassword = (password, old) => { // eslint-disable-line no-unused-vars
    // TODO (Nils) utilize the old password
    this.setState({
      waiting: update(this.state.waiting, {
        password: { $set: true },
      }),
      err: update(this.state.err, {
        password: { $set: '' },
      }),
    });

    const user = firebase.auth().currentUser;
    user.updatePassword(password)
      .then(() => {
        logger.info('Password was changed');
        this.setState({
          waiting: update(this.state.waiting, {
            password: { $set: false },
          }),
        });
      })
      .catch((e) => {
        logger.error(e.message);
        this.setState({
          waiting: update(this.state.waiting, {
            password: { $set: false },
          }),
          err: update(this.state.err, {
            password: { $set: e.message },
          }),
        });
      });
  }

  handleEmail(email) {
    this.setState({
      waiting: update(this.state.waiting, {
        email: { $set: true },
      }),
      err: update(this.state.err, {
        email: { $set: '' },
      }),
    });

    const user = firebase.auth().currentUser;
    const userRef = firebase.database().ref().child(`users/${user.uid}`);

    user.updateEmail(email)
      .then(() => userRef.update({
        email,
      }))
      .then(() => {
        logger.info('Email was updated');

        const { user: newUser } = this.props;
        newUser.email = email;
        this.props.dispatch(updateUser(newUser));

        this.setState({
          waiting: update(this.state.waiting, {
            email: { $set: false },
          }),
        });
      })
      .catch((e) => {
        logger.error(e.message);
        this.setState({
          waiting: update(this.state.waiting, {
            email: { $set: false },
          }),
          err: update(this.state.err, {
            email: { $set: e.message },
          }),
        });
      });
  }

  render() {
    return (
      <Account
        handlePassword={this.handlePassword}
        handleEmail={this.handleEmail}
        user={this.props.user}
        waiting={this.state.waiting}
        err={this.state.err}
      />
    );
  }
}

const getUser = user => user;

const mapStateToProps = state => ({
  user: getUser(state.user),
});

export default connect(mapStateToProps)(AccountContainer);
