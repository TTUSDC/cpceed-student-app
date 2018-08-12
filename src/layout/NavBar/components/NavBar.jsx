// @flow
import React from 'react';

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
import { AuthStates } from 'redux/actions.js';

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
  user: {
    role: string,
    name?: string,
  },
  classes?: {},
  navigate: Function,
  logout: Function,
};

export class NavBar extends React.Component {
  props: Props;
  state = {
    openMenu: false,
    auth: false,
    anchorEl: null,
  };

  // Toggles openning and closing the Login prompt
  toggleAuth = () => {
    this.setState(prevState => ({
      ...this.state,
      auth: !prevState.auth,
    }));
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
                : <AccountButton />
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


NavBar.defaultProps = {
  user: {
    name: '',
  },
  classes: {
    root: null,
  },
};

export default withStyles(styles)(NavBar);
