import { useContext } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { useModalConfig } from '../../contexts/ModalConfigContext';
import { AuthContext } from "../../contexts/AuthContext";
import { useModal } from '../../contexts/ModalContext';
import { deletePost } from "../../app/actions/postsActions";
import { deleteComment } from "../../app/actions/commentsActions";


export default function Delete({ data }) {
  const { id, title, postId } = data;
  const dispatch = useDispatch();
  const { modalConfig: { type } } = useModalConfig();
  const { logout } = useContext(AuthContext);
  const { closeModal } = useModal();

  const handleClick = () => {
    if (type === "post") {
      dispatch(deletePost(id));
      closeModal();
    }
    if (type === "comment") {
      dispatch(deleteComment(id, postId));
      closeModal();
    }
    if (type === "logout") {
      logout(closeModal);
    }
  }

  return (
    <div className="delete-content">
      <div className="delete-header">
        <h2 className="delete-title">
          {type === "post" && <p>Delete Post</p>}
          {type === "comment" && <p>Delete Comment</p>}
          {type === "logout" && <p>Logout</p>}
        </h2>
      </div>

      <div className="delete-body">
        {type === "post" && <p>Are you sure you want to delete the post titled "{title}"?</p>}
        {type === "comment" && <p>Are you sure you want to delete this comment?</p>}
        {type === "logout" && <p>Are you sure you want to log out?</p>}
      </div>

    <div className="delete-footer">
      <button type="submit" className="delete-submit" onClick={handleClick}>{type === "logout" ? "Logout" : "Delete"}</button>
      <button type="button" className="delete-cancel" onClick={closeModal}>Cancel</button>
    </div>
    </div>
  )
}

Delete.propTypes = {
  data: PropTypes.object,
};