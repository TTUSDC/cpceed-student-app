// @flow
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import FaceIcon from '@material-ui/icons/Face';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';

import RequireAuth from 'hoc/RequireAuth.jsx';
import { AccountContainer } from './routes/Account';
import { ProfileContainer } from './routes/Profile';

type Props = {
  // History API used for pushing routes
  history: {
    push: (string) => null,
    location: {
      pathname: string
    }
  },
  // Material-UI Styles
  classes: Object
};

type State = {
  // Tab Selection
  value: number,
}

export class Settings extends React.Component<Props, State> {
  // Should match given style, or test will fail
  static defaultProps = {
    classes: {
      root: {}
    }
  }
  state = {
    value: 1,
  }
  componentDidMount() {
    const { pathname } = this.props.history.location
    this.setState({
      value: pathname === '/settings/profile' ? 0 : 1,
    })
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
            icon={<FaceIcon />}
            onClick={() => {
              this.navigate('/settings/profile');
            }}
          />
          <BottomNavigationAction
            label='Account'
            icon={<SupervisorAccountIcon />}
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
