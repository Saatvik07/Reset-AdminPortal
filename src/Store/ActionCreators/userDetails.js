import { Auth } from 'aws-amplify';
import * as ActionTypes from '../ActionTypes';

export const editUserDetails = (firstName, lastName, email) => {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.EDIT_USER_DETAILS_REQUEST });
    let user = await Auth.currentAuthenticatedUser();

    return await Auth.updateUserAttributes(user, {
      email: email,
      family_name: lastName,
      given_name: firstName
    })
      .then((res) => {
        dispatch({ type: ActionTypes.EDIT_USER_DETAILS_SUCCESS });
      })
      .catch((err) => {
        dispatch({
          type: ActionTypes.EDIT_USER_DETAILS_FAILED,
          error: err.message
        });
        console.log(err);
      });
  };
};

export const changePassword = (oldPassword, newPassword) => {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.CHANGE_PASSWORD_REQUEST });
    let user = await Auth.currentAuthenticatedUser();

    return await Auth.changePassword(user, oldPassword, newPassword)
      .then((res) => {
        dispatch({ type: ActionTypes.CHANGE_PASSWORD_SUCCESS });
      })
      .catch((err) => {
        dispatch({
          type: ActionTypes.CHANGE_PASSWORD_FAILED,
          error: err.message
        });
        console.log(err);
      });
  };
};