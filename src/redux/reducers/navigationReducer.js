import update from 'immutability-helper';
import logger from 'logger.js';

import { NavigationActionTypes } from 'redux/actions/navigationActions';

const {
  TOGGLE_AUTH,
  START_NAV,
  FINISH_NAV,
  CLEAR_NAVIGATION,
  UPDATE_RESTRICTIONS,
} = NavigationActionTypes;

const initialState = {
  // Determines whether or not the auth modal is visible
  showAuthModal: false,
  // Determines whether or not the user has the proper permissions
  // to access the page
  isAuthenticated: false,
  // The page that the user wants to go to
  nextPage: null,
  // The restrictons that the page has
  restrictions: null,
  // Signals a navigatin change
  navigationChange: false,
};

/**
 * Navigate Reducer
 */
function navigationReducer(state = initialState, action) {
  let newState = state;
  switch(action.type) {
    // Connected Redux Router Action Type
    case '@@router/LOCATION_CHANGE':
      newState = update(state, { navigationChange: { $set: true } });
      break;
    case CLEAR_NAVIGATION:
      newState = update(state, { navigationChange: { $set: false } });
      break;
    case TOGGLE_AUTH:
      newState = update(state, { showAuthModal: { $set: action.payload.showAuthModal } });
      break;
    case START_NAV:
      newState = update(state, {
        nextPage: { $set: action.payload.nextPage },
        restrictions: { $set: action.payload.restrictions },
      });
      break;
    case UPDATE_RESTRICTIONS:
      newState = update(state, {
        restrictions: { $set: action.payload.restrictions },
      });
      break;
    case FINISH_NAV:
      newState = update(state, {
        nextPage: { $set: null },
        restrictions: { $set: null },
      });
      break;
    default:
      break;
  }

  return newState;
}

export default navigationReducer;
