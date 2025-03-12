import PropTypes from "prop-types";

import user from "../../assets/img/user.png";
import login from "../../assets/img/login.png"
import key from "../../assets/img/key.png";

export default function Login({ handleTabChange }) {
  const non_field_errors = [];
  const handleSubmit = () => {}
  const handleSetState = () => {

  }

  const form_username = "";

  const username = "";

  const form_password = "";
  const password = "";


  const forgotPassword = () => {}


  return (
    <div>
      <div className={"modal-body mx-3 " + (non_field_errors ? 'mt-3 mb-5' : 'my-5')}> 
        { non_field_errors && 
          <div className="ml-5 mb-4">
            <ul className="non_field_error_list">
              { non_field_errors.map((error, index) =>
                <li key={index} className="help-block"><em>{ error }</em></li>
              )}
            </ul>
          </div>
        }
        
        <div className="form-group">
          <img src={user} alt="username icon" />
          <input 
            type="text" 
            name="form_username" 
            placeholder="Username" 
            className="form-control validate input" 
            onChange={(event) => handleSetState({ [event.target.name]: event.target.value })}
            value={form_username}
          />
        </div>


        { username && 
          <div className="mb-3 ml-5">
            <ul className="non_field_error_list">
              { username.map((error, index) =>
                <li key={index} className="help-block"><em>{ error }</em></li>
              )}
            </ul>
          </div>
        }
    
        <div className="form-group">
          <img src={key} alt="password icon" />
          <input 
            type="password" 
            name="form_password" 
            placeholder="Password"  
            className="form-control validate input"
            onChange={(event) => handleSetState({ [event.target.name]: event.target.value })}
            value={form_password}
          />
        </div>
        { password && 
          <div className="mb-3 ml-5">
            <ul className="non_field_error_list">
              { password.map((error, index) =>
                <li key={index} className="help-block"><em>{ error }</em></li>
              )}
            </ul>
          </div>
        }

        <div className="checkbox-group">
          <input className="checkbox" type="checkbox" name="remember" /><label>Remember me</label>
        </div>

        <div className="links-group">
          <p>Not a member? <span id="register" onClick={handleTabChange}>Register Now!</span></p>
          <p>Forgot <span onClick={forgotPassword}>Password?</span></p>
        </div>
      </div>
      
      <div className="login-footer">
        <button type="submit" onClick={handleSubmit}><p>Login</p><img src={login} alt="login icon" /></button>
      </div>
    </div>
  );
}

Login.propTypes = {
  handleTabChange: PropTypes.func
};