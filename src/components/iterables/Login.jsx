import PropTypes from "prop-types";

import user from "../../assets/img/username.png";
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


  return (
    <form onSubmit={handleSubmit}>
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
        <input type="checkbox" name="remember" /><label>Remember me</label>
      </div>
      <div className="options text-center text-md-right mt-1">
        <p>Not a member? <a href="#" className="blue-text" id="register" onClick={handleTabChange}>Register Now!</a></p>
        <p>Forgot <a href="#" className="blue-text">Password?</a></p>
      </div>
  
    </div>
    <div className="form-actions modal-footer d-flex justify-content-center">
      <button type="submit" className="btn btn-primary">Login <img src={login} alt="login icon" /></button>
    </div>
  </form>
  );
}

Login.propTypes = {
  handleTabChange: PropTypes.func
};