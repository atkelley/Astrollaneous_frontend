import { useState } from "react";

export default function Contact() {
  const [state, setState] = useState({ name: "", email: "", message: "" });
  const [isSent, setIsSent] = useState(false);

  const sendMessage = () => {
    const { name, email, message } = state;

    if (name && email && message) {
      setIsSent(true);
    }
  }

  return (
    <main className="contact">
      <div className="contact-content">
        {isSent 
          ?
            <p>Thank you for your message! Someone will be contacting you shortly.</p> 
          :
            <>
              <div className="contact-header">
                <h2>Contact Us</h2>
              </div>
              <div className="contact-body">
                <div className="form-group">
                  <label htmlFor="name">Name:</label>
                  <input type="text" id="name" name="name" value={state.name} onChange={(e) => setState({ ...state, name: e.target.value})} />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <input type="email" id="email" name="email" value={state.email} onChange={(e) => setState({ ...state, email: e.target.value})} />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message:</label>
                  <textarea id="message" name="message" value={state.message} onChange={(e) => setState({ ...state, message: e.target.value})}></textarea>
                </div>
                <button type="submit" onClick={sendMessage}>Submit</button>
              </div>
            </>
          }
        </div>
    </main>
  );
}