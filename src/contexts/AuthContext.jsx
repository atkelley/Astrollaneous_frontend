import { createContext, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { 
  login as loginService, 
  logout as logoutService, 
  register as registerService,
  validate as validateService
} from "../services/auth.service";
import { showAlert } from "../app/slices/alertSlice";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  const [expiry, setExpiry] = useState(null);
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!token || !expiry) return;

    const interval = setInterval(() => {
      const expiryTime = new Date(expiry).getTime();
      const now = new Date().getTime();

      if (now >= expiryTime) {
        logout();
      } else {
        validate();
      }
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [token, expiry]);

  const validate = async () => {
    await validateService().then((response) => {
      if (response.status === 200) {
        setIsAuthenticated(true);
      }
    }).catch((err) => {
      logout();
    });
  };

  const login = async (username, password, remember, closeModal) => {
    const result = await loginService(username, password);

    if (result.success) {
      if (remember) {
        localStorage.setItem("remember", JSON.stringify({ username, password }));
      }

      dispatch(showAlert({ message: "You have successfully logged in.", type: 'success' }));
      localStorage.setItem("token", result.data.token);
      localStorage.setItem("user", JSON.stringify(result.user));
      setIsAuthenticated(true);
      setToken(result.data.token);
      setExpiry(result.data.expiry);
      setUser(result.user);
      closeModal();
    }

    return result;
  };

  const logout = async (closeModal) => {
    const result = await logoutService();
    
    if (result.success) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setIsAuthenticated(false);
      setToken(null);
      setExpiry(null);
      setUser(null);

      if (closeModal) {
        dispatch(showAlert({ message: "You have successfully logged out.", type: 'success' }));
        closeModal();
      } else {
        dispatch(showAlert({ message: "You have been logged out due to invalid or expired token.", type: 'warning' }));
      }
    }
  }

  const register = async (username, email, password, closeModal) => {
    const result = await registerService(username, email, password);

    if (result.success) {
      dispatch(showAlert({ message: "You have successfully registered and have been logged in.", type: "success" }));
      localStorage.setItem("token", result.data.token);
      localStorage.setItem("user", JSON.stringify(result.user));
      setToken(result.data.token);
      setExpiry(result.data.expiry);
      setUser(result.user);
      closeModal();
    }

    return result;
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, register, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
