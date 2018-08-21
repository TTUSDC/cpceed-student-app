// Many actions use thunk. In order to call dispatch() one after the other,
// you must do so in .then() blocks

import logger from 'logger.js';

// action types

export const UserActionTypes = {
  UPDATE: 'UPDATE',
  CHECK_AUTH: 'CHECK_AUTH',
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
  permissions: PermissionStates.GUEST,
};

// action creators - Sync

/**
 * C
 */
export const changeAuthStatus = isAuthenticated => ({
  type: UserActionTypes.CHECK_AUTH,
  payload: { isAuthenticated },
});

/*
 * Logs the user out by setting reseting their role to guest
 */
export const logoutUser = () => ({
  type: UserActionTypes.UPDATE,
  payload: { user: guest },
});

/**
 * Saves the user into redux
 *
 * @param {object} user - a user object
 */
export const saveUser = user => ({
  type: UserActionTypes.UPDATE,
  payload: { user },
});

// action creators - Async

/**
 * Changes isAuthenticated depending on the current restrictions to the saved in Redux
 */
export const checkAuthStatus = restrictions => (dispatch, getState) => Promise.resolve()
  .then(() => {
    let currentRestrictions;
    // Extract the current state
    if (restrictions) {
      currentRestrictions = restrictions;
    } else {
      currentRestrictions = getState().navigationReducer.restrictions;
    }

    logger.info(currentRestrictions);

    const { user } = getState().userReducer;

    // Default
    let status = true;

    // Only check for the restrictions if there are some
    if (currentRestrictions) {
      Object.keys(currentRestrictions).forEach((key) => {
        if (user.permissions[key] !== currentRestrictions[key]) {
          status = false;
        }
      });
    }

    logger.info(`User has permissions to access page: ${status}`);

    dispatch(changeAuthStatus(status));
  });

/**
 * Updates the user in the store
 *
 * @param { object } user: the user object to put in the store
 */
export const updateUser = user => dispatch => Promise.resolve()
  .then(() => {
    dispatch(saveUser(user));
  })
  .then(() => {
    dispatch(checkAuthStatus());
  });
