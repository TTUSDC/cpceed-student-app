// TODO: Move user's state to localStorge using JWT

import RESTRICTIONS from '_constants/privateRoutes';
import { updateUser, checkAuthStatus, UserActionTypes } from './userActions';
import { push } from 'connected-react-router';
import logger from 'logger.js';

export const NavigationActionTypes = {
  TOGGLE_AUTH: 'TOGGLE_AUTH',
  START_NAV: 'START_NAV',
  FINISH_NAV: 'FINISH_NAV',
  CLEAR_NAVIGATION: 'CLEAR_NAVIGATION',
  UPDATE_RESTRICTIONS: 'UPDATE_RESTRICTIONS',
};

// action creators - Sync

/**
 * Opens Modal
 *
 * @return {string} type - action type
 * @return {boolean} payload.showAuthModal - determines if the modal is open or not
 */
export const openAuthModal = () => ({
  type: NavigationActionTypes.TOGGLE_AUTH,
  payload: {
    showAuthModal: true,
  },
});

/**
 * Closes Modal
 *
 * @return {string} type - action type
 * @return {boolean} payload.showAuthModal - determines if the modal is open or not
 */
export const closeAuthModal = () => ({
  type: NavigationActionTypes.TOGGLE_AUTH,
  payload: {
    showAuthModal: false,
  },
})

export const updateRestrictions = (url) => (dispatch, getState) => {
  const restrictions = RESTRICTIONS[url]
  dispatch({
    type: NavigationActionTypes.UPDATE_RESTRICTIONS,
    payload: { restrictions },
  })
}

export const clearNavigation = () => ({
  type: NavigationActionTypes.CLEAR_NAVIGATION,
})

/**
 * Saves the url that the user wants to go to so
 * that we can continue when the user logs in
 *
 * @param {string} url - the url that the user wants to go to
 */
export const rememberFutureRoute = (nextPage, restrictions) => ({
  type: NavigationActionTypes.START_NAV,
  payload: {
    nextPage,
    restrictions,
  },
})

// action creators - Async

/**
 * Custom navigation action that allows for restrictions to be passed
 *
 * @param {string} url - url that we want to go navigate to
 * @param {Object} restrictions - (optional) the restrictions
 *
 * @param {function} dispatch - dispatch action from redux
 * @param {object} getState - current state
 */
export const startNavigation = (url: string, restrictions?: Permissions) => (dispatch, getState) =>  Promise.resolve()
  .then(() => {
    // if there are no restrictions or if the user is already authorized, navigate immediately
    if (!restrictions || getState().userReducer.isAuthenticated) {
      // Stops here when there are no restrictions passed
      dispatch(push(url));
      return Promise.resolve()
    } else if (restrictions) {
      dispatch(rememberFutureRoute(url, restrictions))
      return Promise.resolve(true)
    }
  })
  .then((needsToLogin) => {
    if (needsToLogin) {
      dispatch(checkAuthStatus())
      return Promise.resolve(true)
    }
  })
  .then((needsToLogin) => {
    if (needsToLogin) {
      dispatch(openAuthModal())
      return Promise.resolve(url, restrictions);
      // TODO: Tell the user through a snackbar that they do not have permissions
    }
  })

/**
 * Closes the Auth Modal if it is open updates the current user in redux
 *
 * @param {object} user - (optional) the user object to save into the store
 */
export const endNavigation = () => dispatch => Promise.resolve()
  .then(() => {
    dispatch(checkAuthStatus());
  })
  .then(() => {
    dispatch(closeAuthModal())
  })
  .then(() => {
    dispatch({
      type: NavigationActionTypes.FINISH_NAV
    })
  })
