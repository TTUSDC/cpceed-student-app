/* eslint-disable */
import update from 'immutability-helper';

import logger from 'logger.js';
import {
  AuthStates,
  PermissionStates,
  UserActionTypes,
  guest,
} from './actions.js';

const selectUser = (state = guest, action) => {
  switch(action.type) {
    case UserActionTypes.UPDATE:
      var user = action.user;

      switch(user.role) {
        case AuthStates.GUEST:
          user.permissions = PermissionStates.GUEST;
          break;
        case AuthStates.STUDENT:
          user.permissions = PermissionStates.STUDENT;
          break;
        case AuthStates.COORDINATOR:
          user.permissions = PermissionStates.COORDINATOR;
          break;
        default:
          logger.error(`Unknown user role ${user.role} in reducers.js`);
      }

      return update(state, { $set: user });
    case UserActionTypes.LOGOUT:
      var user = action.user;

      user.permissions = PermissionStates.GUEST;

      return update(state, { $set: user });
    default:
      state.permissions = PermissionStates.GUEST;

      return state;
  }
};

const cpceedApp = (state = {}, action) => ({
  user: selectUser(state.user, action),
});

export default cpceedApp;
