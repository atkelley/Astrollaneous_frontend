import axios from 'axios';
import { createMessage, returnErrors } from './messagesActions';
import { USER_LOADING, USER_LOADED, AUTH_ERROR, REGISTER_FAIL, REGISTER_SUCCESS, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT_SUCCESS } from './types';
import { showAlert } from '../slices/alertSlice';
import { api } from "../../api/api";


// HELPER FUNCTION - TOKEN SETUP
export const tokenConfig = (getState) => {
  const token = getState().auth.token;
  const config = { headers: { 'Content-Type': 'application/json' }, };

  if (token) {
    config.headers['Authorization'] = `Token ${token}`;
  }

  return config;
};


export const loadUser = () => (dispatch, getState) => {
  dispatch({ type: USER_LOADING });

  axios.get('/auth/user', tokenConfig(getState))
    .then((res) => {
      dispatch({ type: USER_LOADED, payload: res.data, });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({ type: AUTH_ERROR, });
    });
};


export const login = (username, password, remember, closeModal) => (dispatch) => {
  const config = { headers: { 'Content-Type': 'application/json' }, };

  api.post('/users/auth/login', JSON.stringify({ username, password }), config)
    .then((res) => {
      if (remember) {
        localStorage.setItem("user", JSON.stringify({ "username": username, "password": password }));
      }
      console.log(res.data)
      dispatch({ type: LOGIN_SUCCESS, payload: res.data });
      dispatch(showAlert({ message: "You have successfully logged in.", type: 'success' }));
      closeModal();
    })
    .catch((err) => {
      dispatch({ type: LOGIN_FAIL, });
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};


export const register = (username, email, password) => (dispatch) => {
  const config = { headers: { 'Content-Type': 'application/json' }, };
  
  api.post('/users/auth/register', JSON.stringify({ username, email, password }), config)
    .then((res) => {
      dispatch({ type: REGISTER_SUCCESS, payload: res.data });
      dispatch(createMessage({ registerSuccess: 'You have successfully registered and have been logged in.'}));
    })
    .catch((err) => {
      dispatch({ type: REGISTER_FAIL, });
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};


export const logout = (closeModal) => (dispatch, getState) => {
  api.post('/users/auth/logout', null, tokenConfig(getState))
    .then((_) => {
      dispatch({ type: LOGOUT_SUCCESS });
      dispatch(showAlert({ message: "You have successfully logged out.", type: 'success' }));
      closeModal();
    })
    .catch((err) => {;
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};