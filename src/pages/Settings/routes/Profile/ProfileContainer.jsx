// @flow
import React from 'react';
import { connect } from 'react-redux';

import * as server from 'server';
import { updateUser } from 'redux/actions/userActions';
import logger from 'logger.js';
import { Profile } from './components';

type Props = {
  dispatch: Function,
  user: {
    name: string,
    uid: string,
  },
};

type State = {
  proErr: string,
  waiting: boolean,
}

class ProfileContainer extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      proErr: '',
      waiting: false,
    };
  }

  handleSubmit = (data) => {
    this.setState({
      waiting: true,
      proErr: '',
    });

    server.modifyUser(data, this.props.user.uid)
      .then((newUser) => {
        logger.info('User data was updated');

        // Update user in the redux store
        this.props.dispatch(updateUser(newUser));

        this.setState({
          waiting: false,
        });
      })
      .catch((e) => {
        logger.error(e.message);
        this.setState({
          waiting: false,
          proErr: e.message,
        });
      });
  }

  render() {
    return (
      <Profile
        name={this.props.user.name}
        proErr={this.state.proErr}
        waiting={this.state.waiting}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}

const  mapStateToProps = (state) => ({
  user: state.userReducer,
})

export default connect(mapStateToProps)(ProfileContainer);
