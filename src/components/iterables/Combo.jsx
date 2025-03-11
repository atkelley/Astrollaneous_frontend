import { useState } from "react";
import PropTypes from "prop-types";
import Login from "./Login";
import Register from "./Register";

export default function Combo({ tab }) {
  const [active, setActive] = useState(tab);

  const handleSetState = () => {}
  const handleLoginSubmit = () => {}
  const handleRegisterSubmit = () => {}

  const handleTabChange = (event) => {
    setActive(event.target.id);
  }

  return (
    <div className="combo-content">
      <nav>
        <div className="nav nav-tabs combo-tabs-box" id="nav-tabs" role="tablist">
          <div className={`${active === "login" ? "nav-link active combo-tab-link" : "nav-link combo-tab-link"}`} id="login" href="" role="tab" onClick={handleTabChange}>Account Login</div>
          <div className={`${active === "register" ? "nav-link active combo-tab-link" : "nav-link combo-tab-link"}`}  id="register" href="" role="tab" onClick={handleTabChange}>Create an Account</div>
        </div>
      </nav>
      <div className="tab-content" id="tab-content">
        {active === "login" && <Login handleTabChange={handleTabChange} formProps={null} handleSetState={handleSetState} handleSubmit={handleLoginSubmit} />}
        {active === "register" && <Register handleTabChange={handleTabChange} formProps={null} handleSetState={handleSetState} handleSubmit={handleRegisterSubmit} />}
      </div>
    </div>
  )
}

Combo.propTypes = {
  tab: PropTypes.string
};