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
    <div className="combo-box">
      <nav className="combo-tabs-box">
        <div className={`${active === "login" ? "combo-tab active" : "combo-tab"}`} id="login" href="" onClick={handleTabChange}>Account Login</div>
        <div className={`${active === "register" ? "combo-tab active" : "combo-tab"}`}  id="register" href="" onClick={handleTabChange}>Create an Account</div>
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