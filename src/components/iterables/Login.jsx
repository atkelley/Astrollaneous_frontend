import { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { user, key, show, hide, submit } from "../../assets/img/index";
import { AuthContext } from "../../contexts/AuthContext";
import { useModal } from "../../contexts/ModalContext";


export default function Login({ handleTabChange }) {
  const [state, setState] = useState({ username: "", password: "" });
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useContext(AuthContext);
  const { closeModal } = useModal();
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (localStorage.getItem("remember")) {
      let user = JSON.parse(localStorage.getItem("remember"));
      setState({ ...user });
    }
  }, []);

  const handleSubmit = async () => {
    const { username, password } = state;
    
    if (validateForm()) {
      login(username, password, remember, closeModal);
      setState({ username: "", password: "" });
      setErrors({});
    }
  };
  
  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!state.username) {
      newErrors.username = '*** Username is required.';
      isValid = false;
    }

    if (!state.password) {
      newErrors.password = '*** Password is required.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };
  
  const handleOnChange = (event) => {
    if (Object.keys(errors).length > 0) {
      setErrors({});
    }

    setState({ ...state, [event.target.name]: event.target.value.trim() });
  }

  return (
    <>       
      <div className="form-group">
        <img src={user} alt="username icon" />
        <input 
          type="text" 
          name="username" 
          placeholder="Username" 
          className="form-control validate input" 
          onChange={handleOnChange}
          value={state.username}
        />
      </div>
      <p className="error">{errors.username}&nbsp;</p>
  
      <div className="form-group">
        <img src={key} alt="password icon" />
        <input 
          name="password" 
          type={showPassword ? "text" : "password"}
          placeholder="Password"  
          className="form-control validate input"
          onChange={handleOnChange}
          value={state.password}
        />
        <img 
          name="showPassword" 
          src={showPassword ? show : hide} 
          alt={`${showPassword ? "show" : "hide"} password icon`} 
          className="password-icon" 
          onClick={() => { state.password && setShowPassword(!showPassword)}} 
          style={{ backgroundColor: showPassword ? "rgba(255, 0, 0, 0.75)" : "white" }}
        />
      </div>
      <p className="error">{errors.password}&nbsp;</p>

      <div className="checkbox-group">
        <input 
          name="remember"
          type="checkbox" 
          value={remember}
          onChange={() => setRemember(!remember)} 
          checked={remember}
        />
        <label>Remember me</label>
      </div>

      <div className="links-group">
        <p>Not a member? <span id="register" onClick={handleTabChange}>Register Now!</span></p>
        <p>Forgot <span onClick={() => {}}>Password?</span></p>
      </div>
      
      <div className="login-footer">
        <button type="submit" onClick={handleSubmit}><p>Login</p><img src={submit} alt="login icon" /></button>
      </div>
    </>
  );
}

Login.propTypes = {
  handleTabChange: PropTypes.func,
};