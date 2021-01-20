import * as ActionTypes from '../ActionTypes';

const initState = {
  isAlert: false,
  msg: '',
  color: 'dark'
};

const alertReducer = (state = initState, action) => {
  switch (action.type) {
    case ActionTypes.SET_ALERT_MESSAGE:
      return {
        ...state,
        isAlert: true,
        msg: action.message,
        color: action.color
      };

    case ActionTypes.CLEAR_ALERT:
      return { ...state, isAlert: false, msg: '', color: 'dark' };

    default:
      return state;
  }
};

export default alertReducer;
