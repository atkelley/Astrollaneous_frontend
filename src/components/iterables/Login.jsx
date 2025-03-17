import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { login, register } from '../../actions/auth';
import user from "../../assets/img/user.png";
import login_icon from "../../assets/img/login.png"
import key from "../../assets/img/key.png";
import show from "../../assets/img/show.png";
import hide from "../../assets/img/hide.png";

import { useDispatch } from 'react-redux';
import { useLoginMutation } from '../../app/slices/authApiSlice';

export default function Login({ handleTabChange, closeModal }) {
  const [state, setState] = useState({ username: "", password: "" });
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [login, { isLoading, error }] = useLoginMutation();
  const dispatch = useDispatch();

  const non_field_errors = [];

  const forgotPassword = () => {}

  useEffect(() => {
    if (localStorage.getItem("user")) {
      let temp = JSON.parse(localStorage.getItem("user"));
      setState({ ...temp });
    }
  }, []);

  const handleSubmit = async () => {
    const { username, password } = state;

    if(username && password) {
      await login({ username, password }).unwrap().then(result => {
        localStorage.setItem('accessToken', result.access);
        localStorage.setItem('refreshToken', result.refresh);

        if (state.remember) {
          localStorage.setItem("user", JSON.stringify({ "username": username, "password": password }));
        }
        // Dispatch action to update user state
        dispatch({ type: 'SET_USER', payload: result.access });

        closeModal();
      }).catch(({ status, data: { error }}) => console.error(`Login failed (${status}): ${error}`));


      setState({ username: "", password: "" });
      setRemember(false);
      setShowPassword(false);
    }
  }
  
  const handleOnChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  }

  return (
    <div>
      <div className={"modal-body mx-3 " + (non_field_errors ? 'mt-3 mb-5' : 'my-5')}> 
        {non_field_errors && 
          <div className="ml-5 mb-4">
            <ul className="non_field_error_list">
              {non_field_errors.map((error, index) =>
                <li key={index} className="help-block"><em>{error}</em></li>
              )}
            </ul>
          </div>
        }
        
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


        {/* {state.username && 
          <div className="mb-3 ml-5">
            <ul className="non_field_error_list">
              {state.username.map((error, index) =>
                <li key={index} className="help-block"><em>{error}</em></li>
              )}
            </ul>
          </div>
        } */}
    
        <div className="form-group">
          <img src={key} alt="password icon" />
          <input 
            name="password" 
            type={state.password ? "text" : "password"}
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

        {/* {state.password && 
          <div className="mb-3 ml-5">
            <ul className="non_field_error_list">
              {state.password.map((error, index) =>
                <li key={index} className="help-block"><em>{error}</em></li>
              )}
            </ul>
          </div>
        } */}

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

        {/* <div className="checkbox-group">
          <input 
            type="checkbox" 
            name="showPassword" 
            value={showPassword} 
            onChange={() => setShowPassword(!showPassword)} 
            checked={showPassword}
          />
          <label>Show Password?</label>
        </div> */}

        <div className="links-group">
          <p>Not a member? <span id="register" onClick={handleTabChange}>Register Now!</span></p>
          <p>Forgot <span onClick={forgotPassword}>Password?</span></p>
        </div>
      </div>
      
      <div className="login-footer">
        <button type="submit" onClick={handleSubmit}><p>Login</p><img src={login_icon} alt="login icon" /></button>
      </div>
    </div>
  );
}

Login.propTypes = {
  handleTabChange: PropTypes.func,
  closeModal: PropTypes.func
};