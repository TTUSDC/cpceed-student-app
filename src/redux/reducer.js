import { combineReducers } from 'redux';
import userReducer from 'redux/reducers/userReducer.js';
import navigationReducer from 'redux/reducers/navigationReducer.js';

const cpceedApp = combineReducers({
  userReducer,
  navigationReducer,
});

export default cpceedApp;
