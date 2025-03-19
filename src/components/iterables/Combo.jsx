import { useEffect, useState } from "react";
import PropTypes from "prop-types";
// import { login, register } from '../../actions/auth';
import Login from "./Login";
import Register from "./Register";

export default function Combo({ tab, closeModal }) {
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
        {active === "login" && <Login handleTabChange={handleTabChange} handleSetState={handleSetState} handleSubmit={handleLoginSubmit} closeModal={closeModal} />}
        {active === "register" && <Register handleTabChange={handleTabChange} handleSetState={handleSetState} handleSubmit={handleRegisterSubmit} closeModal={closeModal} />}
      </div>
    </div>
  )
}

Combo.propTypes = {
  tab: PropTypes.string,
  closeModal: PropTypes.func
};