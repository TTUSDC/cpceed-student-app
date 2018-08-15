// TODO: @Miggy Break this up into several files
// Many actions use thunk. In order to call dispatch() one after the other,
// you must do so in .then() blocks
import { push } from 'connected-react-router';
import logger from 'logger.js';

import { WAIT_FOR_ACTION } from 'redux-wait-for-action';

// action types

export const UserActionTypes = {
  TOGGLE_AUTH: 'TOGGLE_AUTH',
  UPDATE: 'UPDATE',
};

// RegisterForm.js uses AuthStates to set the database values for role.
export const AuthStates = {
  GUEST: 'guest',
  STUDENT: 'student',
  COORDINATOR: 'admin',
};

/*
  This defines permissions for each user type. If you need to define new
  permissions, you must add them as a comma separated key-value pair to
  each of the user types in PermissionStates.
*/
export type Permissions = { viewActivity?: boolean, viewSettings?: boolean };
export const PermissionStates = {
  GUEST: {
    viewActivity: false,
    viewSettings: false,
  },
  STUDENT: {
    viewActivity: true,
    viewSettings: true,
  },
  COORDINATOR: {
    viewActivity: true,
    viewSettings: true,
  },
};

export const coordinator = {
  email: '',
  name: '',
  role: AuthStates.COORDINATOR,
};

export const student = {
  email: '',
  isApproved: false,
  name: '',
  points: {
    career: 0,
    community: 0,
    firstother: 0,
    firstworkshops: 0,
    mentor: 0,
    other: 0,
    outreach: 0,
    professor: 0,
    staff: 0,
    misc: 0,
  },
  role: AuthStates.STUDENT,
  uid: '',
};

export const guest = {
  role: AuthStates.GUEST,
};

// action creators

/**
 * Updates the user in the store
 *
 * @param { object } user: the user object to put in the store
 */
export const updateUser = user => ({
  type: UserActionTypes.UPDATE,
  user,
});

/**
 * Opens the Auth Modal so that the user can login/register
 */
export const openAuthModal = () => (dispatch) => Promise.resolve()
  .then(() => {
    dispatch({
      type: UserActionTypes.TOGGLE_AUTH,
      openModal: true,
    })
  })

/**
 * Closes the auth modal and checks to see if they user has logged in
 * If no user is give, the modal is just closed
 *
 * @param {string} user - the user object to be saved into the state
 *
 * @param {function} dispatch - dispatch action from redux
 * @param {object} getState - current state
 *
 * @return {Promise}
 */
export const closeAuthModal = (user?: {}) => dispatch => Promise.resolve()
  .then(() => {
    // If the user has sucsessfully supplied their credentials
    if (user) dispatch(updateUser(user));
  })
  .then(() => {
    dispatch({
      type: UserActionTypes.TOGGLE_AUTH,
      openModal: false,
    });
    return Promise.resolve();
  })

export const waitForUserCredAndContinue = (url: string) => (dispatch, getState) => {
}

/**
 * Custom navigation action that allows for restrictions to be passed
 *
 * @param {string} url - url that we want to go navigate to
 * @param {Object} restrictions - (optional) the restrictions
 *
 * @param {function} dispatch - dispatch action from redux
 * @param {object} getState - current state
 */
export const navigate = (url: string, restrictions?: Permissions) => (dispatch, getState) => {
  return Promise.resolve()
    .then(() => {
      // if there are no restrictions, navigate immediately
      if (!restrictions) dispatch(push(url));
    })
    .then(() => {
      if (restrictions) {
        const currentUser = getState().userReducer;

        // If the user meets all of the required permissions, push them to
        if (checkPermissions(currentUser, restrictions)) {
          return Promise.resolve(dispatch(push(url)));
        } else {
          return dispatch({
            type: UserActionTypes.TOGGLE_AUTH,
            [ WAIT_FOR_ACTION ]: UserActionTypes.UPDATE,
            openModal: true,
          })
        }
      }
    })
    .then(() => {
      let correctPermissions;
      if (restrictions) {
        if (checkPermissions(getState().userReducer, restrictions)) {
          dispatch(push(url))
          correctPermissions = true;
        } else {
          dispatch(closeAuthModal())
          correctPermissions = false;
        }
      }
    })
}

const checkPermissions = (user, restrictions): boolean => {
  let authorized = true;

  // Loop through the keys of the restrictions passed in
  Object.keys(restrictions).forEach((key) => {
    if (user.permissions[key] !== restrictions[key]) {
      authorized = false;
    }
  });

  return authorized
}

/*
 * Logs the user out by setting reseting their role
 */
export function logoutUser() {
  const user = guest;
  return {
    type: UserActionTypes.UPDATE,
    user,
  };
}
