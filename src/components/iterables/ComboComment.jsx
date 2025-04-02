import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { useModalConfig } from '../../contexts/ModalConfigContext';
import { useModal } from "../../contexts/ModalContext";
import { updateComment, createComment } from "../../app/actions/commentsActions";
import { showAlert } from "../../app/slices/alertSlice";


export default function ComboComment ({ data }) {
  const { id, text, postId } = data;
  const [state, setState] = useState("");
  const { modalConfig: { type } } = useModalConfig();
  const { closeModal } = useModal();
  const dispatch = useDispatch();

  useEffect(() => {
    if (type === "update") {
      setState(text);
    }
  }, []);

  const handleCancel = () => {
    setState("");
    closeModal();
  }

  const handleSubmit = () => {
    if (type === "create" && state) {
      dispatch(createComment(postId, state));
      dispatch(showAlert({ message: "A new comment has been successfully created.", type: 'success' }));
    }
    
    if (type === "update" && state) {
      dispatch(updateComment(id, state, postId));
      dispatch(showAlert({ message: "Your comment has been successfully updated.", type: 'success' }));
    }

    handleCancel();
  }
  
  return (
    <div className="content">
      <div className="header">
        <h2>{type === "create" ? "Create" : "Update"} Comment</h2>
      </div>
      <div className="body">
        <div className="group">
          <label htmlFor="text">Text:</label>
          <textarea type="text" name="text" value={state} onChange={(event) => setState(event.target.value)} />
        </div>
        <div className="buttons">
          <button type="submit" onClick={handleSubmit}>{type === "create" ? "Create" : "Edit"} Comment</button>
          <button type="button" onClick={handleCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

ComboComment.propTypes = {
  data: PropTypes.object
};