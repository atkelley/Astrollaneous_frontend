import { useState, useContext } from "react";
import PropTypes from "prop-types";
import { user, key, mail, lock, show, hide, submit } from "../../assets/img/index";
import { AuthContext } from "../../contexts/AuthContext";
import { useModal } from "../../contexts/ModalContext";

export default function Register({ handleTabChange }) {
  const [state, setState] = useState({ username: "", email: "", password: "", confirmation: "" });
  const [passwords, setPasswords] = useState({ password: false, confirmation: false });
  const { register } = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleOnChange = (event) => {
    if (Object.keys(errors).length > 0) {
      setErrors({});
    }

    setState({ ...state, [event.target.name]: event.target.value});
  }

  const handlePasswords = (event) => {
    if (state[event.target.name]) {
      setPasswords({ ...passwords, [event.target.name]: !passwords[event.target.name] });
    }
  }

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!state.username) {
      newErrors.username = '*** Username is required.';
      isValid = false;
    }

    if (!state.email) {
      newErrors.email = '*** Email is required.';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email)) {
      newErrors.email = '*** Invalid email format.';
      isValid = false;
    }

    if (!state.password) {
      newErrors.password = '*** Password is required.';
      isValid = false;
    } else if (state.password.length < 8) {
      newErrors.password = '*** Password must be 8 characters or more.';
      isValid = false;
    }

    if (!state.confirmation) {
      newErrors.confirmation = '*** Password confirmation is required.';
      isValid = false;
    } else if (state.confirmation !== state.password) {
      newErrors.confirmation = '*** Passwords must match.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      register(state.username, state.email, state.password, closeModal);
      setState({ username: "", email: "", password: "", confirmation: "" });
      setErrors({});
    }
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
          autoComplete="off"
        />
      </div>
      <p className="error">{errors.username}&nbsp;</p>

      <div className="form-group">
        <img src={mail} alt="mail icon" />
        <input 
          type="email" 
          name="email" 
          placeholder="Email" 
          className="form-control validate input" 
          onChange={handleOnChange}
          value={state.email}
          autoComplete="off"
        />
      </div>
      <p className="error">{errors.email}&nbsp;</p>
  
      <div className="form-group">
        <img src={key} alt="password icon" />
        <input 
          name="password" 
          type={passwords['password'] ? "text" : "password"}
          placeholder="Password" 
          className="form-control validate input" 
          onChange={handleOnChange}
          value={state.password}
          autoComplete="off"
        />
        <img 
          name="password"
          src={passwords['password'] ? show : hide} 
          alt={`${passwords['password'] ? "show" : "hide"} password icon`} 
          className="password-icon" 
          onClick={handlePasswords} 
          style={{ backgroundColor: passwords['password'] ? "rgba(255, 0, 0, 0.75)" : "white" }}
        />
      </div>
      <p className="error">{errors.password}&nbsp;</p>

      <div className="form-group">
        <img src={lock} alt="password conformation icon" />
        <input 
          name="confirmation" 
          type={passwords['confirmation'] ? "text" : "password"}
          placeholder="Password Confirmation" 
          className="form-control validate input" 
          onChange={handleOnChange}
          value={state.confirmation}
          autoComplete="off"
        />
        <img 
          name="confirmation"
          src={passwords['confirmation'] ? show : hide} 
          alt={`${passwords['confirmation'] ? "show" : "hide"} password confirmation icon`} 
          className="confirmation-icon" 
          onClick={handlePasswords} 
          style={{ backgroundColor: passwords['confirmation'] ? "rgba(255, 0, 0, 0.75)" : "white" }}
        />
      </div>
      <p className="error">{errors.confirmation}&nbsp;</p>

      <div className="link-group">
        <p>Already have an account? <span id="login" onClick={handleTabChange}>Log In!</span></p>
      </div>
    
      <div className="register-footer">
        <button type="submit" onClick={handleSubmit}><p>Register</p><img src={submit} alt="register icon" /></button>
      </div>
    </>
  )
}

Register.propTypes = {
  handleTabChange: PropTypes.func
};