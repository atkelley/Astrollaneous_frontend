import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import PropTypes from "prop-types";
import { login } from '../../app/actions/authActions';
import { user, key, show, hide, submit } from "../../assets/img/index";
import { useModal } from "../../contexts/ModalContext";

export default function Login({ handleTabChange }) {
  const dispatch = useDispatch();
  const [state, setState] = useState({ username: "", password: "" });
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { closeModal } = useModal();
  
  const non_field_errors = [];


  useEffect(() => {
    if (localStorage.getItem("user")) {
      let user = JSON.parse(localStorage.getItem("user"));
      setState({ ...user });
    }
  }, []);

  const handleSubmit = async () => {
    const { username, password } = state;

    if(username && password) {
      dispatch(login(username, password, remember, closeModal));
    }
  };
  
  const handleOnChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value.trim() });
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
          <p>Forgot <span onClick={() => {}}>Password?</span></p>
        </div>
      </div>
      
      <div className="login-footer">
        <button type="submit" onClick={handleSubmit}><p>Login</p><img src={submit} alt="login icon" /></button>
      </div>
    </div>
  );
}

Login.propTypes = {
  handleTabChange: PropTypes.func,
};