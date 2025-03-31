import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { useModalConfig } from '../../contexts/ModalConfigContext';
import { createPost, updatePost } from "../../app/actions/postsActions";
import { useModal } from '../../contexts/ModalContext';
import { showAlert } from "../../app/slices/alertSlice";


export default function ComboPost({ data }) {
  const { title, image_url, text, id, user } = data;
  const [state, setState] = useState({ title: "", image_url: "", text: "" });
  const { modalConfig: { type } } = useModalConfig();
  const { closeModal } = useModal();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (type === "update") {
      setState({ title, image_url, text });
    }
  }, [])

  const handleCancel = () => {
    setState({ title: "", image_url: "", text: "" });
    closeModal();
  }

  const handleOnChange = (event) => {
    setState({ ...state, [event.target.id]: event.target.value});
  }

  const handleSubmit = () => {
    if (type === "create" && state.title && state.text) {
      dispatch(createPost({ title: state.title, image_url: (state.image_url ? state.image_url : null), text: state.text, user: user }));
      dispatch(showAlert({ message: "A new post has been successfully created.", type: 'success' }));
      navigate("/blog");
    }
    
    if (type === "update") {
      dispatch(updatePost({ id, title: state.title, image_url: (state.image_url ? state.image_url : null), text: state.text }));
      dispatch(showAlert({ message: "Your post has been successfully updated.", type: 'success' }));
    }

    handleCancel();
  }

  return (
    <div className="content">
      <div className="header">
        <h2>{type === "create" ? "Create" : "Update"} Post</h2>
      </div>
      <div className="body">
        <div className="group">
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" name="title" value={state.title} onChange={handleOnChange} />
        </div>
        <div className="group">
          <label htmlFor="image_url">Image URL:</label>
          <input type="image_url" id="image_url" name="image_url" value={state.image_url || ""} onChange={handleOnChange} />
        </div>
        <div className="group">
          <label htmlFor="text">Text:</label>
          <textarea id="text" name="text" value={state.text} onChange={handleOnChange}></textarea>
        </div>
        <div className="buttons">
          <button type="submit" onClick={handleSubmit}>{type === "create" ? "Create" : "Edit"} Post</button>
          <button type="button" onClick={handleCancel}>Cancel</button>
        </div>
      </div>
    </div>
  )
}

ComboPost.propTypes = {
  data: PropTypes.object
};