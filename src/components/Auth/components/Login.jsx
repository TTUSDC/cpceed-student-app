import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';

import styles from './Login.styles.js';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
  };

  handleInputChange = name => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  }

  handleSubmit = () => {
    // This prevents a '?' from being appended to the URL
    if (!this.props.waiting) {
      this.props.handleLogin(this.state.email, this.state.password);
    }
  }

  render() {
    const { logErr, classes, waiting } = this.props;
    const { email, password } = this.state;
    return (
      <form className={classes.container} noValidate autoComplete='off'>
        <FormControl className={classes.text}>
          <InputLabel htmlFor='email-input'>Email</InputLabel>
          <Input
            id='email-input'
            type='email'
            value={email}
            onChange={this.handleInputChange('email')}
          />
        </FormControl>
        <FormControl
          className={classes.text}
          error={Boolean(logErr)}
        >
          <InputLabel htmlFor='password-input'>Password</InputLabel>
          <Input
            id='password-input'
            type='password'
            value={password}
            onChange={this.handleInputChange('password')}
          />
          {/* Display Error only when there is an error in the password */}
          {/* TODO: Turn this into a snackbar */}
          {
            this.props.logErr
              ? <FormHelperText error>{logErr}</FormHelperText>
              : null
            }
        </FormControl>
        <Button
          id='login-button'
          className={classes.button}
          fullWidth
          variant='contained'
          color='primary'
          disabled={waiting}
          onClick={this.handleSubmit}
        >
          Login
        </Button>
      </form>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.shape({}),
  handleLogin: PropTypes.func.isRequired,
  logErr: PropTypes.string.isRequired,
  waiting: PropTypes.bool.isRequired,
};

Login.defaultProps = {
  classes: {},
};

export default withStyles(styles)(Login);
