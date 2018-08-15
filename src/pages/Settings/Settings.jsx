// @flow
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import Button from 'grommet/components/Button';

import { AccountContainer } from './routes/Account';
import { ProfileContainer } from './routes/Profile';

type Props = { history: { push: (string) => null } };

export class Settings extends React.Component<Props> {
  navigate = (url: string) => {
    this.props.history.push(url);
  }

  render() {
    return (
      <Box>
        <Header
          fixed={false}
          size='medium'
          justify='center'
          flex
          direction='row'
          responsive={false}
          pad={{ between: 'small' }}
        >
          <Button
            label='Profile'
            primary={false}
            onClick={() => {
              this.navigate('/settings/profile');
            }}
          />
          <Button
            label='Account'
            primary={false}
            onClick={() => {
              this.navigate('/settings/account');
            }}
          />
        </Header>

        <Route
          exact
          path='/settings'
          render={() => (
            <Redirect to='/settings/profile' />
          )}
        />

        <Route path='/settings/profile' component={AccountContainer} />
        <Route path='/settings/account' component={ProfileContainer} />
      </Box>
    );
  }
}

export default Settings;
