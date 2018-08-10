import React from 'react';
import PropTypes from 'prop-types';

// import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import logger from 'logger.js';
import Login from './Login.jsx';
import Register from './Register.jsx';

class Auth extends React.Component {
  state = {
    index: 'one',
  };

  handleTabChange = (event, newIndex) => {
    this.setState({
      index: newIndex,
    });
  }

  render() {
    const {
      handleLogin,
      handleRegister,
      regErr,
      waiting,
      logErr,
    } = this.props;

    const {
      index,
    } = this.state;

    return (
      <div>
        <Tabs
          value={index}
          onChange={this.handleTabChange}
          indicatorColor='primary'
          textColor='primary'
          fullWidth
        >
          <Tab value='one' label='Register' />
          <Tab value='two' label='Login' />
        </Tabs>

        {/* Content for the Tabs */}
        {
          index === 'one'
            && <Register
              handleRegister={handleRegister}
              regErr={regErr}
              waiting={waiting}
            />
        }
        {
          index === 'two'
            && <Login
              handleLogin={handleLogin}
              logErr={logErr}
              waiting={waiting}
            />
        }
      </div>
    );
  }
}

Auth.propTypes = {
  handleRegister: PropTypes.func,
  handleLogin: PropTypes.func,
  regErr: PropTypes.string,
  logErr: PropTypes.string,
  waiting: PropTypes.bool,
};

Auth.defaultProps = {
  handleRegister: () => logger.error('handleRegister called without being passed'),
  handleLogin: () => logger.error('handleLogin called without being passed'),
  regErr: '',
  logErr: '',
  waiting: false,
};

export default Auth;
