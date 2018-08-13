// @flow
import React from 'react';
import logger from 'logger.js';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

// Fields
import { RoleField, TextField } from 'components/';

// Verification
import { FormChecker as withInputValidation } from 'hoc/';

// Styles
import { FormStyles as styles } from 'components/Auth/styles/';

type State = {
  email: string,
  password: string,
  confirmPass: string,
  name: string,
  role: string,
}

type FormValues = {
  email: string,
  password: string,
  name: string,
  role: string,
}

type Props = {
  // Handles a registration action
  handleRegister: (FormValues) => null,
  // Registration/Network Error
  regErr: string,
  // True: waiting for a network call to finish
  waiting: boolean,
  // Styles
  classes: Object,
  // Email Error from FormChecker
  emailErr: string,
  // Password Error from FormChecker
  passErr: string,
  // Confirm Password Error from FormChecker
  confirmErr: string,
  // Validation function to tell FormCheck what we are validating
  validate: (string, State) => null,
};

export class RegisterForm extends React.Component<Props, State> {
  state = {
    email: '',
    password: '',
    confirmPass: '',
    name: '',
    role: 'student',
  };

  handleInputChange = (name: string) => (event: SyntheticInputEvent<HTMLInputElement>) => {
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

      return newState;
    });
  }

  // Determines whether or not to prevent a submittion
  checkForErrors = () => new Promise((resolve, reject) => {
    // Checks for the errors
    const preventSubmit = (
      Boolean(this.props.regErr)
      || Boolean(this.props.emailErr)
      || Boolean(this.props.passErr)
      || Boolean(this.props.confirmErr)
      || this.state.password === ''
      || this.state.confirmPass === ''
      || this.state.name === ''
      || this.state.email === ''
    );

    if (preventSubmit === true) {
      reject(new Error('There are invalid values in the fields above'));
    // Checks for a stalled server
    } else if (this.props.waiting === true) {
      reject(new Error('Server not ready'));
    }

    resolve();
  });

  // Will either accept the submittion or display an error when submitting
  handleSubmit = () => {
    this.checkForErrors()
      .then(() => {
        this.props.handleRegister({
          email: this.state.email,
          password: this.state.password,
          name: this.state.name,
          role: this.state.role,
        });
      })
      .catch((err) => {
        // TODO: Display a global error
        logger.info(this.props);
        logger.error(err.message);
      });
  }

  render() {
    const {
      email,
      password,
      confirmPass,
      name,
      role,
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
          onClick={this.handleSubmit}
        >
          Sign Up
        </Button>
      </form>
    );
  }
}

export default withStyles(styles)(withInputValidation(RegisterForm));
