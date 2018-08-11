import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

// Fields
import { RoleField, PasswordField } from 'components/';

class RegisterForm extends React.Component {
  state = {
    email: '',
    password: '',
    confirmPass: '',
    name: '',
    role: 'student',
    err: {
      emailErr: '',
      passErr: '',
      confirmErr: '',
    },
  };

  handleInputChange = name => (event) => {
    const { value } = event.target;
    this.setState((prevState) => {
      const newState = prevState;

      // Resets the confirmPass field
      if(name === 'password') {
        newState.confirmPass = '';
        newState.err.confirmErr = '';
      }

      // Replace selected state with new value
      newState[name] = value;

      return newState;
    });
  }

  handleSubmit = () => {
    this.props.handleRegister({
      email: this.state.email,
      password: this.state.password,
      name: this.state.name,
      role: this.state.role,
    });
  }

  render() {
    const {
      // email,
      password,
      confirmPass,
      // name,
      role,
      err: {
        emailErr,
        passErr,
        confirmErr,
      },
    } = this.state;

    const {
      regErr,
      waiting,
    } = this.props;

    return (
      <form noValidate autoComplete='off'>
        <RoleField
          name='role'
          currentValue={role}
          onNewValue={this.handleInputChange}
        />
        {/* Email goes here!!! */}
        <Typography align='center' variant='caption'>
        Your password should use at least 8 characters. It should
        contain only ASCII text, with at least one uppercase, one
        lowercase, one number, and one special character.
        </Typography>
        <PasswordField
          title='Password'
          name='password'
          currentValue={password}
          onNewValue={this.handleInputChange}
          error={passErr}
        />
        <PasswordField
          title='Confirm Password'
          name='confirmPass'
          currentValue={confirmPass}
          onNewValue={this.handleInputChange}
          error={confirmErr}
        />
        {/* Screen Name goes here!!! */}
        <Button
          variant='raised'
          fullWidth
          color='primary'
          disabled={
            waiting
            || Boolean(regErr)
            || Boolean(emailErr)
            || Boolean(passErr)
            || Boolean(confirmErr)
          }
          onClick={this.handleSubmit}
        >
          Sign Up
        </Button>
      </form>
    );
  }
}

RegisterForm.propTypes = {
  // Handles a registration action
  handleRegister: PropTypes.func.isRequired,
  // Don't know what this is
  regErr: PropTypes.string.isRequired,
  // True: waiting for a network call to finish
  waiting: PropTypes.bool.isRequired,
  // Styles
  // classes: PropTypes.shape({}),
};

RegisterForm.defaultProps = {
  // classes: {},
};

const styles = {};

export default withStyles(styles)(RegisterForm);
