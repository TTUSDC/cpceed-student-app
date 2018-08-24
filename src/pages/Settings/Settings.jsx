// @flow
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';

import RequireAuth from 'hoc/RequireAuth.jsx';
import { AccountContainer } from './routes/Account';
import { ProfileContainer } from './routes/Profile';

type Props = {
  // History API used for pushing routes
  history: {
    push: (string) => null
  },
  // Material-UI Styles
  classes: Object
};

type State = {
  // Tab Selection
  value: number,
}

export class Settings extends React.Component<Props, State> {
  state = {
    value: 1,
  }
  navigate = (url: string) => {
    this.props.history.push(url);
  }

  handleChange = (_: any, value: number) => {
    this.setState({ ...this.state, value })
  }

  render() {
    const { classes } = this.props;
    const { value } = this.state;
    return (
      <React.Fragment>
        <Route
          exact
          path='/settings'
          render={() => (
            <Redirect to='/settings/profile' />
          )}
        />

        <Route path='/settings/profile' component={AccountContainer} />
        <Route path='/settings/account' component={ProfileContainer} />
        <BottomNavigation
          value={value}
          showLabels
          onChange={this.handleChange}
          className={classes.root}
        >
          <BottomNavigationAction
            label='Profile'
            icon={<RestoreIcon />}
            onClick={() => {
              this.navigate('/settings/profile');
            }}
          />
          <BottomNavigationAction
            label='Account'
            icon={<FavoriteIcon />}
            onClick={() => {
              this.navigate('/settings/account');
            }}
          />
        </BottomNavigation>
      </React.Fragment>
    );
  }
}

const requiredState = {
  viewSettings: true,
};

const styles = {
  root: {
    width: '100%',
  },
}

// The permissions object is passed as the second argument to RequireAuth
export default RequireAuth(withStyles(styles)(Settings), requiredState);
