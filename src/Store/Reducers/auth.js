import * as ActionTypes from '../ActionTypes';

const initState = {
  isLoading: false,
  error: '',
  user: null,
  idToken: null,
  isRegistered: false
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case ActionTypes.LOGIN_REQUEST:
      return { ...state, error: '', user: null, isLoading: true };

    case ActionTypes.LOGIN_SUCCESS:
      return { ...state, error: '', user: action.payload, isLoading: false };

    case ActionTypes.LOGIN_FAILED:
      return { ...state, error: action.error, user: null, isLoading: false };

    case ActionTypes.LOGOUT_REQUEST:
      return { ...state, error: '', user: null, isLoading: true };

    case ActionTypes.LOGOUT_SUCCESS:
      return { ...state, error: '', user: null, isLoading: false };

    case ActionTypes.LOGOUT_FAILED:
      return { ...state, error: action.error, isLoading: false };

    case ActionTypes.REGISTER_REQUEST:
      return { ...state, error: '', isLoading: true };

    case ActionTypes.REGISTER_SUCCESS:
      return { ...state, error: '', isLoading: false, isRegistered: true };

    case ActionTypes.REGISTER_FAILED:
      return {
        ...state,
        error: action.error,
        isLoading: false,
        isRegistered: false
      };

    case ActionTypes.UPDATE_USER_REQUEST:
      return { ...state, error: '', isLoading: true };

    case ActionTypes.UPDATE_USER_SUCCESS:
      return { ...state, error: '', user: action.payload, isLoading: false };

    case ActionTypes.UPDATE_USER_FAILED:
      return { ...state, error: '', isLoading: false };

    case ActionTypes.RESET_PASSWORD_REQUEST:
      return { ...state, error: '', isLoading: true };

    case ActionTypes.RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        error: '',
        isLoading: false,
        resetPasswordDestination: action.payload
      };

    case ActionTypes.RESET_PASSWORD_FAILED:
      return { ...state, error: action.error, isLoading: false };

    case ActionTypes.RESET_PASSWORD_CONFIRM_REQUEST:
      return {
        ...state,
        error: '',
        isLoading: true,
        resetPasswordStatus: null
      };

    case ActionTypes.RESET_PASSWORD_CONFIRM_SUCCESS:
      return {
        ...state,
        error: '',
        isLoading: false,
        resetPasswordStatus: true
      };

    case ActionTypes.RESET_PASSWORD_CONFIRM_FAILED:
      return {
        ...state,
        error: action.error,
        isLoading: false,
        resetPasswordStatus: false
      };
    
    case ActionTypes.NEW_USER_LOGIN_REQUEST:
      return {
        ...state,
        isLoading:true,
      };
    case ActionTypes.NEW_USER_LOGIN_SUCCESS:
      return {
        ...state,
        isLoading:false,
        idToken:action.payload
      }
    case ActionTypes.NEW_USER_LOGIN_FAILED:
      return {
        ...state,
        isLoading:false,
        idToken:null,
      }

    default:
      return state;
  }
};

export default authReducer;
