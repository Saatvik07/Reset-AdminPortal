import * as ActionTypes from '../ActionTypes';

export const setAlert = ({ message, color }) => {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.SET_ALERT_MESSAGE,
      message: message,
      color: color
    });
  };
};

export const clearAlert = () => {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.CLEAR_ALERT
    });
  };
};
