import { useState } from "react";
import PropTypes from "prop-types";
import { user, key, mail, lock, show, hide, submit } from "../../assets/img/index";


export default function Register({ handleTabChange }) {
  const [state, setState] = useState({ username: "", email: "", password: "", confirmation: "" });
  const [passwords, setPasswords] = useState({ password: false, confirmation: false });
  const non_field_errors = null;

  const handleSubmit = () => { }

  const handleOnChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value});
  }

  const handlePasswords = (event) => {
    if (state[event.target.name]) {
      setPasswords({ ...passwords, [event.target.name]: !passwords[event.target.name] });
    }
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
          <img src={mail} alt="mail icon" />
          <input 
            type="email" 
            name="email" 
            placeholder="Email" 
            className="form-control validate input" 
            onChange={handleOnChange}
            value={state.email}
          />
        </div>

        {/* {state.email && 
          <div className="mb-3 ml-5">
            <ul className="non_field_error_list">
              {state.email.map((error, index) =>
                <li key={index} className="help-block"><em>{error}</em></li>
              )}
            </ul>
          </div>
        } */}
    
        <div className="form-group">
          <img src={key} alt="password icon" />
          <input 
            name="password" 
            type={passwords['password'] ? "text" : "password"}
            placeholder="Password" 
            className="form-control validate input" 
            onChange={handleOnChange}
            value={state.password}
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

        {/* {state.password && 
          <div className="mb-3 ml-5">
            <ul className="non_field_error_list">
              {state.password.map((error, index) =>
                <li key={index} className="help-block"><em>{error}</em></li>
              )}
            </ul>
          </div>
        } */}

        <div className="form-group">
          <img src={lock} alt="password conformation icon" />
          <input 
            name="confirmation" 
            type={passwords['confirmation'] ? "text" : "password"}
            placeholder="Password Confirmation" 
            className="form-control validate input" 
            onChange={handleOnChange}
            value={state.confirmation}
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

        {/* {state.confirmation && 
          <div className="mb-3 ml-5">
            <ul className="non_field_error_list">
              {password_confirmation.map((error, index) =>
                <li key={index} className="help-block"><em>{error}</em></li>
              )}``
            </ul>
          </div>
        } */}

        <div className="link-group">
          <p>Already have an account? <span id="login" onClick={handleTabChange}>Log In!</span></p>
        </div>
    
      </div>
      <div className="register-footer">
        <button type="submit" onClick={handleSubmit}><p>Register</p><img src={submit} alt="register icon" /></button>
      </div>
    </div>
  )
}

Register.propTypes = {
  handleTabChange: PropTypes.func
};