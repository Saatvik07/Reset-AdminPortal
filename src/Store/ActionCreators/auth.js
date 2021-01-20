import * as ActionTypes from '../ActionTypes';
import { Auth } from 'aws-amplify';

export const loginAction = (email, password) => {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.LOGIN_REQUEST });
    return await Auth.signIn(email, password)
      .then((res) => {
        dispatch({
          type: ActionTypes.LOGIN_SUCCESS,
          payload: res
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: ActionTypes.LOGIN_FAILED,
          error: err.message
        });
      });
  };
};
export const newUserLoginAction = (user,newPassword)=>{
    return async (dispatch) => {
        dispatch({type: ActionTypes.NEW_USER_LOGIN_REQUEST});
        try {
            await Auth.completeNewPassword(user,newPassword);
            dispatch({type:ActionTypes.NEW_USER_LOGIN_SUCCESS,payload:(await Auth.currentSession()).getIdToken().getJwtToken()})
        }
        catch(error){
            dispatch({
                type: ActionTypes.NEW_USER_LOGIN_FAILED,
                error:error.code
            })
        }
        
    }
}
export const logoutAction = () => {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.LOGOUT_REQUEST });
    return await Auth.signOut()
      .then((res) => {
        dispatch({ type: ActionTypes.LOGOUT_SUCCESS });
      })
      .catch((err) => {
        dispatch({ type: ActionTypes.LOGOUT_FAILED, error: err.message });
        console.log(err);
      });
  };
};

export const registerAction = (
  username,
  password,
  email,
  firstName,
  lastName
) => {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.REGISTER_REQUEST });
    return await Auth.signUp({
      username: username,
      password: password,
      attributes: {
        email: email,
        given_name: firstName,
        family_name: lastName
      }
    })
      .then((res) => {
        console.log(res);
        dispatch({ type: ActionTypes.REGISTER_SUCCESS });
      })
      .catch((err) => {
        dispatch({ type: ActionTypes.REGISTER_FAILED, error: err.message });
        console.log(err);
      });
  };
};

export const getUser = () => {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.UPDATE_USER_REQUEST });
    return await Auth.currentAuthenticatedUser()
      .then((res) => {
        dispatch({ type: ActionTypes.UPDATE_USER_SUCCESS, payload: res });
      })
      .catch((err) => {
        dispatch({ type: ActionTypes.UPDATE_USER_FAILED, error: err });
        // console.log(err);
      });
  };
};

export const resetPassword = (username) => {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.RESET_PASSWORD_REQUEST });
    return await Auth.forgotPassword(username)
      .then((res) => {
        console.log(res);
        dispatch({
          type: ActionTypes.RESET_PASSWORD_SUCCESS,
          payload: res.CodeDeliveryDetails.Destination
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: ActionTypes.RESET_PASSWORD_FAILED,
          error: err.message
        });
      });
  };
};

export const resetPasswordConfirm = (username, code, new_password) => {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.RESET_PASSWORD_CONFIRM_REQUEST });
    return await Auth.forgotPasswordSubmit(username, code, new_password)
      .then((res) => {
        dispatch({ type: ActionTypes.RESET_PASSWORD_CONFIRM_SUCCESS });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: ActionTypes.RESET_PASSWORD_CONFIRM_FAILED,
          error: err.message
        });
      });
  };
};
