import { useState } from "react";
import { useDispatch } from 'react-redux';
import { contact } from '../../app/actions/authActions';
import { useModal } from '../../contexts/ModalContext';

export default function Contact() {
  const dispatch = useDispatch();
  const [state, setState] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleOnChange = (event) => {
    setState({ ...state, [event.target.id]: event.target.value});
  }

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!state.name) {
      newErrors.name = '*** Name is required.';
      isValid = false;
    }

    if (!state.email) {
      newErrors.email = '*** Email is required.';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email)) {
      newErrors.email = '*** Invalid email format.';
      isValid = false;
    }

    if (!state.message) {
      newErrors.message = '*** Message is required.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      dispatch(contact(name, email, message, closeModal));
      setState({ name: "", email: "", message: "" });
      setErrors({});
    }
  };

  return ( 
    <form className="content" method="POST" onSubmit={handleSubmit}>
      <div className="header">
        <h2>Contact Us</h2>
      </div>
      <div className="body">
        <div className="group">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={state.name} onChange={handleOnChange} />
          <p className="error">{errors.name}&nbsp;</p>
        </div>
        <div className="group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={state.email} onChange={handleOnChange} />
          <p className="error">{errors.email}&nbsp;</p>
        </div>
        <div className="group">
          <label htmlFor="message">Message:</label>
          <textarea id="message" name="message" value={state.message} onChange={handleOnChange}></textarea>
          <p className="error">{errors.message}&nbsp;</p>
        </div>
        <div className="button">
          <button type="submit">Submit</button>
        </div>
      </div>
    </form>
  );
}