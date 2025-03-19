import { useDispatch } from 'react-redux';
import PropTypes from "prop-types";
import { logout } from '../../app/actions/authActions';

export default function Logout({ closeModal }) {
  const dispatch = useDispatch();


  const isPost = false;

  const handleSubmit = () => {}

  return (
    <div className="logout-content">
      <div className="header"></div>

      <div className="logout-body">
        <p>Are you sure you want to log out?</p>
      </div>

      <div className="logout-footer">
        <button type="submit" className="logout" onClick={() => dispatch(logout(closeModal))}>Log Out</button>
        <button type="button" className="cancel" onClick={closeModal}>Cancel</button>
      </div>
    </div>
  )
}

Logout.propTypes = {
  closeModal: PropTypes.func
};