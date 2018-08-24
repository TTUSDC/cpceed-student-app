// @flow
import React from 'react';
import update from 'immutability-helper';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { FormChecker as withInputValidation } from 'hoc/';

// Styles
import { FormStyles as styles } from 'components/Auth/styles/';

import { TextField } from 'components/';

import logger from 'logger.js';

type Props = {
  // Change password handler from container
  handlePassword: (newPassword: string, password: string) => null,
  // Change email handler from container
  handleEmail: (email: string) => null,
  // User object
  user: { email: string },
  // Errors
  passErr: string,
  emailErr: string,
  confirmErr: string,
  newPassErr: string,
  // Validation passed by hoc
  validate: (name: string, newValues: State) => null,
  // Server status
  waiting: {
    password: boolean,
    email: boolean,
  },
  // Material UI styles
  classes: Object,
};

// Form
type State = {
  password: string,
  confirmPass: string,
  newPassword: string,
  email: string,
}

class Account extends React.Component<Props, State> {
  state = {
    password: '',
    confirmPass: '',
    newPassword: '',
    email: this.props.user.email,
  };

  handleInputChange = (name: string) => (event: SyntheticInputEvent<HTMLInputElement>) => {
    const { value } = event.target;
    this.setState((prevState) => {
      const newState = prevState;

      // Resets the confirmPass field
      if(name === 'password') {
        newState.confirmPass = '';
        newState.newPassword = '';
      }

      // Replace selected state with new value
      newState[name] = value;

      this.props.validate(name, newState);

      return newState;
    });
  }

  checkForEmailErrors = () => new Promise((resolve, reject) => {
    // Checks for the errors and empty inputs
    const preventSubmit = (
      Boolean(this.props.emailErr)
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

  checkForPasswordErrors = () => new Promise((resolve, reject) => {
    // Checks for the errors and empty inputs
    const preventSubmit = (
      Boolean(this.props.newPassErr)
      || Boolean(this.props.passErr)
      || Boolean(this.props.confirmErr)
      || this.state.password === ''
      || this.state.confirmPass === ''
      || this.state.newPassword === ''
    );

    if (preventSubmit === true) {
      reject(new Error('There are invalid values in the fields above'));
    // Checks for a stalled server
    } else if (this.props.waiting === true) {
      reject(new Error('Server not ready'));
    }
    resolve();
  });

  handlePasswordChangeSubmit = () => {
    logger.info('Password Change Submitted')
    const { newPassword, password } = this.state;
    this.checkForPasswordErrors()
      .then(() => {
        this.props.handlePassword(newPassword, password);
      })
      .catch((err) => {
        // TODO: Display a global Error
        logger.info(this.props)
        logger.error(err.message)
      })
  }

  handleEmailChangeSubmit = () => {
    logger.info('Email Change Submitted')
    const { email } = this.state;
    this.checkForEmailErrors()
      .then(() => {
        this.props.handleEmail(email);
      })
      .catch((err) => {
        logger.info(this.props)
        logger.error(err.message);
      })

  }

  render() {
    const { classes, emailErr, newPassErr, passErr, confirmErr } = this.props;
    const { email, password, confirmPass, newPassword } = this.state;
    return (
      <React.Fragment>
        <form className={classes.container} noValidate autoComplete='off'>
          <Typography variant='title'>
            Change Password
          </Typography>
          <Typography align='center' variant='caption'>
          Your password should use at least 8 characters. It should
          contain only ASCII text, with at least one uppercase, one
          lowercase, one number, and one special character.
          </Typography>
          <TextField
            hide
            title='Old Password'
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
            hide
            title='New Password'
            tag='newPassword'
            currentValue={newPassword}
            onNewValue={this.handleInputChange}
            error={newPassErr}
          />
          <Button
            id='password-submit-button'
            variant='raised'
            fullWidth
            color='primary'
            onClick={this.handlePasswordChangeSubmit}
          >
            Change Password
          </Button>
        </form>
        <form className={classes.container} noValidate autoComplete='off'>
          <Typography variant='title'>
            Change Email
          </Typography>
          <TextField
            title='Email'
            tag='email'
            currentValue={email}
            onNewValue={this.handleInputChange}
            error={emailErr}
          />
          <Button
            id='email-submit-button'
            variant='raised'
            fullWidth
            color='primary'
            onClick={this.handleEmailChangeSubmit}
          >
            Change Email
          </Button>
        </form>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(withInputValidation(Account));
