import * as ActionTypes from '../ActionTypes';

const initState = {
  isLoading: false,
  error: '',
  updateStatus: null
};

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case ActionTypes.EDIT_USER_DETAILS_REQUEST:
      return { ...state, isLoading: true, error: '', updateStatus: null };

    case ActionTypes.EDIT_USER_DETAILS_SUCCESS:
      return { ...state, isLoading: false, error: '', updateStatus: true };

    case ActionTypes.EDIT_USER_DETAILS_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        updateStatus: false
      };

    case ActionTypes.CHANGE_PASSWORD_REQUEST:
      return { ...state, isLoading: true, error: '', updateStatus: null };

    case ActionTypes.CHANGE_PASSWORD_SUCCESS:
      return { ...state, isLoading: false, error: '', updateStatus: true };

    case ActionTypes.CHANGE_PASSWORD_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        updateStatus: false
      };

    default:
      return state;
  }
};

export default userReducer;
