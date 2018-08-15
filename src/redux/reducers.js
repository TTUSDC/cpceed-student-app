/* eslint-disable */
import update from 'immutability-helper';

import { combineReducers } from 'redux';
import logger from 'logger.js';
import {
  AuthStates,
  PermissionStates,
  UserActionTypes,
  guest,
} from './actions.js';

const userReducer = (state = guest, action) => {
  switch(action.type) {
    // Update the user with the correct permisions and credentials
    case UserActionTypes.UPDATE:
      var user = action.user;

      switch(user.role) {
        case AuthStates.GUEST:
          user.permissions = PermissionStates.GUEST;
          break;
        case AuthStates.STUDENT:
          user.email = 'another@gmail.com';
          user.permissions = PermissionStates.STUDENT;
          break;
        case AuthStates.COORDINATOR:
          user.permissions = PermissionStates.COORDINATOR;
          break;
        default:
          logger.error(`Unknown user role ${user.role} in reducers.js`);
      }

      return update(state, { $set: user });
    default:
      state.permissions = PermissionStates.GUEST;

      return state;
  }
};

function authReducer(state = { openModal: false }, action) {
  switch(action.type) {
    case UserActionTypes.TOGGLE_AUTH:
      return update(state, { openModal: { $set: action.openModal } })
    default:
      return state;
  }
}

const cpceedApp = combineReducers({
  userReducer,
  authReducer,
})

export default cpceedApp;
