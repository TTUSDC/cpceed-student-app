import React from 'react';
import PropTypes from 'prop-types';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import { ModalView } from 'components/';
import AuthContainer from 'layout/Auth';

import { withStyles } from '@material-ui/core/styles';

import { AuthStates } from 'redux/actions.js';

const { GUEST } = AuthStates;

// If the user is a guest, show a Sign In Button
// Use the navigate and logout props

// TODO: Render the auth view in a modal instead
export const MenuButton = (props) => {
  const { toggle } = props;
  return (
    <IconButton onClick={toggle} color='inherit'>
      <AccountCircle />
    </IconButton>
  );
};

MenuButton.propTypes = {
  toggle: PropTypes.func.isRequired,
};

// Opens up the Auth Modal when clicked
export const SignUpButton = (props) => {
  const { toggleAuth } = props;
  return (
    <Button onClick={toggleAuth} color='inherit'>
      Sign Up
    </Button>
  );
};

SignUpButton.propTypes = {
  toggleAuth: PropTypes.func.isRequired,
};

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flexGrow: 1,
  },
};

export class NavBar extends React.Component {
  state = {
    openMenu: false,
    auth: false,
    anchorEl: null,
  };

  toggleAuth = () => {
    this.setState({
      ...this.state,
      auth: !this.state.auth,
    });
  }

  toggleOpenMenu = (event) => {
    this.setState({
      ...this.state,
      anchorEl: event.currentTarget,
    });
  }

  handleClose = () => {
    this.setState({
      ...this.state,
      anchorEl: null,
    });
  }

  handleLogout = () => {
    this.props.logout();
  }

  handleSettingsNavigation = () => {
    this.props.navigate('settings/');
  }

  toggleModal = () => {
    this.setState({
      ...this.state,
      auth: !this.state.auth,
    });
  }

  render() {
    const { anchorEl, auth } = this.state;
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position='fixed'>
          <Toolbar>
            <IconButton onClick={this.toggleOpenMenu} color='inherit'>
              <MenuIcon />
            </IconButton>
            {/* The menu for the routes */}
            <Menu
              id='RoutesMenu'
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={this.handleClose}
            >
              <MenuItem onClick={this.handleSettingsNavigation}>
                Settings
              </MenuItem>
              <MenuItem onClick={this.handleLogout}>
                Logout
              </MenuItem>
            </Menu>
            <Typography className={classes.flex} variant='title' color='inherit'>
              CPCEED!
            </Typography>
            {
              this.props.user.role === GUEST
                ? <SignUpButton toggleAuth={this.toggleAuth} />
                : <MenuButton />
            }
            <ModalView open={auth} toggle={this.toggleModal}>
              <AuthContainer
                authCancelled={this.toggleAuth}
                authFinished={this.toggleAuth}
              />
            </ModalView>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}


NavBar.propTypes = {
  user: PropTypes.shape({
    role: PropTypes.string.isRequired,
    name: PropTypes.string,
  }).isRequired,
  classes: PropTypes.shape({}),
  navigate: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
};

NavBar.defaultProps = {
  user: {
    name: '',
  },
  classes: {
    root: null,
  },
};

export default withStyles(styles)(NavBar);
