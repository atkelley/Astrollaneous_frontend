import { api } from "../api/api";


export const validate = async () => {
  const config = { headers: { "Content-Type": "application/json", "Authorization": `Token ${localStorage.getItem("token")}`,  } };

  return api.get('/users/auth/validate', {}, config)
    .then((response) => {
      return response;
    }).catch((err) => {
      console.error(err);
    });
};


export const login = async (username, password) => {
  const config = { headers: { "Content-Type": "application/json" } };

  return api.post('/users/auth/login', JSON.stringify({ username, password }), config)
    .then((response) => {
      return { success: true, token: response.data.token, user: response.data.user };
    }).catch((err) => {
      console.error(err);
    });
};


export const logout = async () => {
  const config = { headers: { "Content-Type": "application/json", "Authorization": `Token ${localStorage.getItem("token")}`,  } };

  return api.post('/users/auth/logout', {}, config).
    then(_ => {
      return { success: true };
    }).catch((err) => { 
      console.error(err); 
    });
};


export const register = async (username, email, password) => { 
  const config = { headers: { "Content-Type": "application/json" } };

  return api.post('/users/auth/register', JSON.stringify({ username, email, password }), config)
    .then((response) => {
      return { success: true, token: response.data.token, user: response.data.user };
    }).catch((err) => {
      console.error(err); 
    });
};