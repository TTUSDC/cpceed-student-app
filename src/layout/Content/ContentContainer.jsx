import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import Events from 'pages/Events';
import Activity from 'pages/Activity';
import Settings from 'pages/Settings';

// Handles all the routing which will display the routes in the body of the page
const ContentContainer = () => (
  <React.Fragment>
    {/* Load the events page by default */}
    <Route
      exact
      path='/'
      render={() => (
        <Redirect to='/events' />
      )}
    />

    {/* Set the children of the primary component */}
    <Route path='/events' component={Events} />
    <Route path='/activity' component={Activity} />
    <Route path='/settings' component={Settings} />
  </React.Fragment>
);

export default ContentContainer;
