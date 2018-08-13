// @flow
import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import { FormStyles as styles } from 'components/Auth/styles/';

import { TextField } from 'components/';

type Props = {
  classes: Object,
  handleLogin: (email: string, password: string) => null,
  logErr: string,
  waiting: boolean,
};

type State = {
  email: string,
  password: string,
}

export class Login extends React.Component<Props, State> {
  state = {
    email: '',
    password: '',
  };

  handleInputChange = (name: string) => (event: SyntheticInputEvent<HTMLInputElement>) => {
    this.setState({
      [name]: event.target.value,
    });
  }

  handleSubmit = () => {
    this.props.handleLogin(this.state.email, this.state.password);
  }

  render() {
    const { logErr, classes, waiting } = this.props;
    const { email, password } = this.state;

    return (
      <form className={classes.container} noValidate autoComplete='off'>
        <TextField
          title='Email'
          tag='email'
          currentValue={email}
          onNewValue={this.handleInputChange}
        />
        <TextField
          hide
          title='Password'
          tag='password'
          currentValue={password}
          onNewValue={this.handleInputChange}
          error={logErr}
        />
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

export default withStyles(styles)(Login);
