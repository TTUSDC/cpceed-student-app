import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

// Fields
import { RoleField, TextField } from 'components/';

// Verification
import { FormChecker as withInputValidation } from 'hoc/';

export class RegisterForm extends React.Component {
  state = {
    email: '',
    password: '',
    confirmPass: '',
    name: '',
    role: 'student',
    preventSubmit: true,
  };

  handleInputChange = name => (event) => {
    const { value } = event.target;
    this.setState((prevState) => {
      const newState = prevState;

      // Resets the confirmPass field
      if(name === 'password') {
        newState.confirmPass = '';
      }

      // Replace selected state with new value
      newState[name] = value;

      this.props.validate(name, newState);
      this.checkForErrors();

      return newState;
    });
  }

  // Determines whether or not to prevent a submittion
  checkForErrors = () => (
    this.setState((prevState) => {
      const newState = prevState;
      newState.preventSubmit = (
        this.props.waiting
        || Boolean(this.props.regErr)
        || Boolean(this.props.emailErr)
        || Boolean(this.props.passErr)
        || Boolean(this.props.confirmErr)
      );
      return newState;
    })
  );

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
      email,
      password,
      confirmPass,
      name,
      role,
      preventSubmit,
    } = this.state;

    const {
      emailErr,
      passErr,
      confirmErr,
      classes,
    } = this.props;


    return (
      <form className={classes.container} noValidate autoComplete='off'>
        <RoleField
          name='role'
          currentValue={role}
          onNewValue={this.handleInputChange}
        />
        <TextField
          title='Email'
          tag='email'
          currentValue={email}
          onNewValue={this.handleInputChange}
          error={emailErr}
        />
        <Typography align='center' variant='caption'>
        Your password should use at least 8 characters. It should
        contain only ASCII text, with at least one uppercase, one
        lowercase, one number, and one special character.
        </Typography>
        <TextField
          hide
          title='Password'
          tag='password'
          currentValue={password}
          onNewValue={this.handleInputChange}
          error={passErr}
        />
        <TextField
          hide
          title='Confirm Password'
          tag='confirmPass'
          currentValue={confirmPass}
          onNewValue={this.handleInputChange}
          error={confirmErr}
        />
        <TextField
          title='Screen Name'
          tag='name'
          currentValue={name}
          onNewValue={this.handleInputChange}
        />
        <Button
          variant='raised'
          fullWidth
          color='primary'
          disabled={preventSubmit}
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
  classes: PropTypes.shape({}),
  // Email Error from FormChecker
  emailErr: PropTypes.string.isRequired,
  // Password Error from FormChecker
  passErr: PropTypes.string.isRequired,
  // Confirm Password Error from FormChecker
  confirmErr: PropTypes.string.isRequired,
  // Validation function to tell FormCheck what we are validating
  // Requires a tag name
  validate: PropTypes.func.isRequired,
};

RegisterForm.defaultProps = {
  classes: {},
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    // Translation: Any child of the host
    '& > *': {
      margin: '10px',
    },
  },
};

export default withStyles(styles)(withInputValidation(RegisterForm));
