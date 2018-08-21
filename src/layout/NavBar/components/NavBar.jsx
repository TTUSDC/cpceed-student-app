// @flow
import React from 'react';

import { Permissions, AuthStates } from 'redux/actions/userActions';
import { SETTINGS_REQUIRED_PERMS, ACTIVITY_REQUIRED_PERMS } from '_constants/privateRoutes.js';

import logger from 'logger.js';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { withStyles } from '@material-ui/core/styles';

// Multi-use components
import { ModalView, AuthContainer } from 'components/';

// Single-use components
import { AccountButton, SignUpButton } from 'layout/NavBar/components';

const { GUEST } = AuthStates;

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flexGrow: 1,
  },
};

type Props = {
  // Redux: Used to toggle opening and closing the login page
  // These three props help determine whether or not the modal is open
  authStart: () => null,
  authFinished: () => null,
  showAuthModal: boolean,

  // Redux: User Object
  user: {
    role: string,
    name: string,
  },

  // Material UI: styles
  classes: Object,
  // Redux: navigate by pushing to the url stack
  navigate: (url: string, permissions?: Permissions) => any,
  // Redux: log the user out
  logout: () => any,
};

type State = {
  openMenu: boolean,
  anchorEl: any, // Element
}

export class NavBar extends React.Component<Props, State> {

  state = {
    openMenu: false,
    anchorEl: null,
  };

  toggleOpenMenu = (event: SyntheticEvent<HTMLButtonElement>) => {
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

  handleNavigation = (url: string, permissions?: Permissions) => () => {
    if (permissions) logger.info(permissions)
    this.props.navigate(url, permissions);
  }

  render() {
    const { anchorEl } = this.state;
    const {
      classes,
      showAuthModal,
      authStart,
      authFinished,
      user,
    } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position='sticky'>
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
              <MenuItem onClick={this.handleNavigation('/events')}>
                Events
              </MenuItem>
              <MenuItem onClick={this.handleNavigation('/settings', SETTINGS_REQUIRED_PERMS)}>
                Settings
              </MenuItem>
              <MenuItem onClick={this.handleNavigation('/activity', ACTIVITY_REQUIRED_PERMS)}>
                Activity
              </MenuItem>
              <MenuItem onClick={this.handleLogout}>
                Logout
              </MenuItem>
            </Menu>
            <Typography className={classes.flex} variant='title' color='inherit'>
              CPCEED!
            </Typography>
            {
              // If the user is logged in, show the AccountButton
              // TODO: Make sure to fix teh Account Menu
              this.props.user.role === GUEST
                ? <SignUpButton toggleAuth={authStart} />
                : <AccountButton />
            }
            <ModalView open={showAuthModal} closeModal={authFinished}>
              <AuthContainer authFinished={authFinished} />
            </ModalView>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(NavBar);
