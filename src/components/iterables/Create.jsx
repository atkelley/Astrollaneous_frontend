import { useState } from "react";
import PropTypes from "prop-types";

export default function Create({ closeModal }) {
  const [state, setState] = useState({ title: "", image_url: "", text: "" });

  const sendMessage = () => {
    const { title, image_url, text } = state;


  }

  const handleCloseModal = () => {
    setState({ title: "", image_url: "", text: "" });
    closeModal();
  }

  return (
    <div className="content">
      <div className="header">
        <h2>Create Post</h2>
      </div>
      <div className="body">
        <div className="group">
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" name="title" value={state.title} onChange={(e) => setState({ ...state, name: e.target.value})} />
        </div>
        <div className="group">
          <label htmlFor="image_url">Image URL:</label>
          <input type="image_url" id="image_url" name="image_url" value={state.image_url} onChange={(e) => setState({ ...state, email: e.target.value})} />
        </div>
        <div className="group">
          <label htmlFor="text">Text:</label>
          <textarea id="text" name="text" value={state.text} onChange={(e) => setState({ ...state, message: e.target.value})}></textarea>
        </div>
        <div className="button">
          <button type="submit" onClick={sendMessage}>Create Post</button>
          <button type="button" onClick={handleCloseModal}>Cancel</button>
        </div>
      </div>
    </div>
  )
}

Create.propTypes = {
  closeModal: PropTypes.func
};