import axios from "axios";
import { createMessage, returnErrors } from "./messagesActions";
import { USER_LOADING, USER_LOADED, AUTH_ERROR, REGISTER_FAIL, REGISTER_SUCCESS, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT_SUCCESS } from "./types";
import { showAlert } from "../slices/alertSlice";
import { api } from "../../api/api";


// HELPER FUNCTION - TOKEN SETUP
// export const tokenConfig = (getState) => {
//   const token = getState().auth.token;
//   const config = { headers: { "Content-Type": "application/json" }, };

//   if (token) {
//     config.headers["Authorization"] = `Token ${token}`;
//   }

//   return config;
// };


export const getCurrentUser = () => (dispatch) => {
  const token = localStorage.getItem("token");

  api.get('/users/auth/user', { headers: { 'Authorization': `Token ${token}` } })
    .then((response) => {
      dispatch({ type: USER_LOADED, payload: response.data });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};


export const login = (username, password, remember, closeModal, setAuthenticated) => (dispatch) => {
  api.post('/users/auth/login', JSON.stringify({ username, password }))
    .then((response) => {
      if (remember) {
        localStorage.setItem("user", JSON.stringify({ "username": username, "password": password }));
      }

      localStorage.setItem("token", response.data.token);
      setAuthenticated(true);
      dispatch({ type: LOGIN_SUCCESS, payload: response.data });
      dispatch(showAlert({ message: "You have successfully logged in.", type: 'success' }));
      closeModal();
    })
    .catch((err) => {
      console.error(err);
    });
};


export const register = (username, email, password, closeModal, setAuthenticated) => (dispatch) => { 
  api.post('/users/auth/register', JSON.stringify({ username, email, password }), config)
    .then((response) => {
      localStorage.setItem("token", response.data.token);
      setAuthenticated(true);
      dispatch({ type: REGISTER_SUCCESS, payload: response.data });
      dispatch(createMessage({ registerSuccess: 'You have successfully registered and have been logged in.'}));
      closeModal();
    })
    .catch((err) => {
      dispatch({ type: REGISTER_FAIL, });
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};


export const logout = (closeModal, setAuthenticated, setToken) => (dispatch) => {
  const token = localStorage.getItem("token");
  if (!token) return;
  const config = { headers: { Authorization: `Token ${token}` } };

  api.post('/users/auth/logout', {}, config)
    .then((_) => {
      setAuthenticated(false);
      localStorage.removeItem("token");
      setToken(null);
      dispatch({ type: LOGOUT_SUCCESS });
      dispatch(showAlert({ message: "You have successfully logged out.", type: 'success' }));
      closeModal();
    })
    .catch((err) => {;
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};


export const contact = (name, email, message, closeModal) => (dispatch) => {
  // TO-DO: create backend route and process for forwarding name, email & message to business/website email address
  dispatch(showAlert({ message: "Thank you for your message! We'll be in touch shortly.", type: 'success' }));
  closeModal();
};