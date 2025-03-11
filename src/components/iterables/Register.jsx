import PropTypes from "prop-types";

import username from "../../assets/img/username.png";
import login from "../../assets/img/login.png"
import mail from "../../assets/img/mail.png";
import lock from "../../assets/img/lock.png";
import key from "../../assets/img/key.png";

export default function Register({ handleTabChange }) {
  const non_field_errors = null;

  const handleSubmit = () => { }

  const handleSetState = () => {}

  const form_username = "";
  const username = "";

  const form_email = "";
  const email = "";

  const form_password = "";
  const password = "";

  const form_password_confirmation = "";
  const password_confirmation = "";



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

      <div className="md-form mb-3">
        <i className="fas fa-user icon prefix grey-text" aria-hidden="true"></i>
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

      <div className="md-form mb-3">
        <i className="fas fa-envelope icon prefix grey-text" aria-hidden="true"></i>
        <input 
          type="email" 
          name="form_email" 
          placeholder="Email" 
          className="form-control validate input" 
          onChange={(event) => handleSetState({ [event.target.name]: event.target.value })}
          value={form_email}
        />
      </div>
      { email && 
        <div className="mb-3 ml-5">
          <ul className="non_field_error_list">
            { email.map((error, index) =>
              <li key={index} className="help-block"><em>{ error }</em></li>
            )}
          </ul>
        </div>
      }
  
      <div className="md-form mb-3">
        <i className="fas fa-key icon prefix grey-text" aria-hidden="true"></i>
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

      <div className="md-form mb-3">
        <i className="fas fa-lock icon prefix grey-text" aria-hidden="true"></i>
        <input 
          type="password" 
          name="form_password_confirmation" 
          placeholder="Password Confirmation" 
          className="form-control validate input" 
          onChange={(event) => handleSetState({ [event.target.name]: event.target.value })}
          value={form_password_confirmation}
        />
      </div>
      { password_confirmation && 
        <div className="mb-3 ml-5">
          <ul className="non_field_error_list">
            { password_confirmation.map((error, index) =>
              <li key={index} className="help-block"><em>{ error }</em></li>
            )}``
          </ul>
        </div>
      }

      <div className="options text-center text-md-right mt-1">
        <p>Already have an account? <a href="#" className="blue-text" id="login" onClick={handleTabChange}>Log In!</a></p>
      </div>
  
    </div>
    <div className="form-actions modal-footer d-flex justify-content-center">
      <button type="submit" className="btn btn-primary">Register <i className="fas fa-sign-in-alt ml-1" aria-hidden="true"></i></button>
    </div>
  </form>
  )
}

Register.propTypes = {
  handleTabChange: PropTypes.func
};