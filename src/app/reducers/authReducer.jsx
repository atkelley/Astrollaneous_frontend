import { LOGOUT_SUCCESS, USER_LOADED } from '../actions/types';

const initialState = { user: null };

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOADED:
      return { ...state, user: action.payload };
    case LOGOUT_SUCCESS:
      return { ...state, user: null };
    default:
      return state;
  }
};
