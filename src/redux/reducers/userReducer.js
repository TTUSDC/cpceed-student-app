import update from 'immutability-helper';
// import logger from 'logger.js';

import {
  AuthStates,
  PermissionStates,
  UserActionTypes,
  guest,
} from 'redux/actions/userActions.js';

const initialState = {
  user: guest,
  isAuthenticated: false,
};

const userReducer = (state = initialState, action) => {
  let newState = state;
  let newUser;

  switch(action.type) {
    // Update the user with the correct permisions and credentials
    case UserActionTypes.UPDATE:
      newUser = action.payload.user;
      switch(newUser.role) {
        case AuthStates.GUEST:
          newUser.permissions = PermissionStates.GUEST;
          break;
        case AuthStates.STUDENT:
          newUser.permissions = PermissionStates.STUDENT;
          break;
        case AuthStates.COORDINATOR:
          newUser.permissions = PermissionStates.COORDINATOR;
          break;
        default:
          break;
      }

      newState = update(newState, {
        user: { $set: newUser },
      });
      break;

    case UserActionTypes.CHECK_AUTH:
      newState = update(state, {
        isAuthenticated: { $set: action.payload.isAuthenticated },
      });
      break;

    default:
      break;
  }

  return newState;
};

export default userReducer;
