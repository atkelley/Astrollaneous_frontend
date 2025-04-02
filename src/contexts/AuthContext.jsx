import { createContext, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { login as loginService, logout as logoutService, register as registerService } from "../services/auth.service";
import { showAlert } from "../app/slices/alertSlice";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (token && user) {
      setToken(token);
      setUser(JSON.parse(user));
    }
  }, []); 

  const login = async (username, password, remember, closeModal) => {
    const result = await loginService(username, password);

    if (result.success) {
      if (remember) {
        localStorage.setItem("remember", JSON.stringify({ username, password }));
      }

      dispatch(showAlert({ message: "You have successfully logged in.", type: 'success' }));
      localStorage.setItem("token", result.token);
      localStorage.setItem("user", JSON.stringify(result.user));
      setToken(result.token);
      setUser(result.user);
      closeModal();
    }

    return result;
  };

  const logout = async (closeModal) => {
    const result = await logoutService();
    
    if (result.success) {
      dispatch(showAlert({ message: "You have successfully logged out.", type: 'success' }));
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setToken(null);
      setUser(null);
      closeModal();
    }
  }

  const register = async (username, email, password, closeModal) => {
    const result = await registerService(username, email, password);

    if (result.success) {
      dispatch(showAlert({ message: "You have successfully registered and have been logged in.", type: "success" }));
      localStorage.setItem("token", result.token);
      localStorage.setItem("user", JSON.stringify(result.user));
      setToken(result.token);
      setUser(result.user);
      closeModal();
    }

    return result;
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
