import { createSlice } from "@reduxjs/toolkit";
import { USER_LOADING, USER_LOADED, AUTH_ERROR, REGISTER_FAIL, REGISTER_SUCCESS, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT_SUCCESS } from '../actions/types';


export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isLoading: false,
    user: null,
  },
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes.
      // Also, no return statement is required from these functions.
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
  },
});

export const { increment, decrement, incrementByAmount } = authSlice.actions;

export default authSlice.reducer;



// const auth = (state = initialState, action) => {
//   switch (action.type) {
//     case USER_LOADING:
//       return { ...state, isLoading: true };
//     case USER_LOADED:
//       return { ...state, isLoading: false, isAuthenticated: true, user: action.payload };
//     case LOGIN_SUCCESS:
//     case REGISTER_SUCCESS:
//       localStorage.setItem('token', action.payload.token);
//       return { ...state, isLoading: false, isAuthenticated: true, ...action.payload };
//     case AUTH_ERROR:
//     case LOGIN_FAIL:
//     case LOGOUT_SUCCESS:
//     case REGISTER_FAIL:
//       localStorage.removeItem('token');
//       return {...state, isLoading: false, isAuthenticated: false, user: null, token: null };
//     default:
//       return state;
//   }
// };

// export default auth;