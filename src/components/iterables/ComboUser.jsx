import { useState } from "react";
import { useModalConfig } from "../../contexts/ModalConfigContext";
import Register from "./Register";
import Login from "./Login";


export default function ComboUser() {
  const { modalConfig: { type } } = useModalConfig();
  const [active, setActive] = useState(type);

  const handleTabChange = (event) => {
    setActive(event.target.id);
  }

  return (
    <div className="combo-box">
      <nav className="combo-tabs-box">
        <div className={`${active === "login" ? "combo-tab active" : "combo-tab"}`} id="login" href="" onClick={handleTabChange}>Account Login</div>
        <div className={`${active === "register" ? "combo-tab active" : "combo-tab"}`}  id="register" href="" onClick={handleTabChange}>Create an Account</div>
      </nav>
      <div className="tab-content">
        {active === "login" && <Login handleTabChange={handleTabChange} />}
        {active === "register" && <Register handleTabChange={handleTabChange} />}
      </div>
    </div>
  )
}