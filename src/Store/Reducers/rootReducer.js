import { combineReducers } from 'redux';
import authReducer from './auth';
import alertReducer from './alert';
import userReducer from './userDetails';
const rootReducer = combineReducers({
  auth: authReducer,
  alert: alertReducer,
  user: userReducer,
});

export default rootReducer;
