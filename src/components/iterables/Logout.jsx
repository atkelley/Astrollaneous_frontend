import PropTypes from "prop-types";

export default function Logout({ closeModal }) {
  const isPost = false;

  const handleSubmit = () => {}

  return (
    <div className="logout-content">
      <div className="header"></div>

      <div className="logout-body">
        <p>Are you sure you want to log out?</p>
      </div>

      <div className="logout-footer">
        <button type="submit" className="logout" onClick={handleSubmit}>Log Out</button>
        <button type="button" className="cancel" onClick={closeModal}>Cancel</button>
      </div>
    </div>
  )
}

Logout.propTypes = {
  closeModal: PropTypes.func
};