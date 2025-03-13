import { useState } from "react";

export default function Contact() {
  const [state, setState] = useState({ name: "", email: "", message: "" });

  const sendMessage = () => {
    const { name, email, message } = state;

  }


  const handleOnChange = (event) => {
    setState({ ...state, [event.target.id]: event.target.value});
  }

  return ( 
    <div className="content">
      <div className="header">
        <h2>Contact Us</h2>
      </div>
      <div className="body">
        <div className="group">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={state.name} onChange={handleOnChange} />
        </div>
        <div className="group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={state.email} onChange={handleOnChange} />
        </div>
        <div className="group">
          <label htmlFor="message">Message:</label>
          <textarea id="message" name="message" value={state.message} onChange={handleOnChange}></textarea>
        </div>
        <div className="button">
          <button type="submit" onClick={sendMessage}>Submit</button>
        </div>
      </div>
    </div>
  );
}