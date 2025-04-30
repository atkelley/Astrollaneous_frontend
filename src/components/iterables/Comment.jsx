import { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getFormalDateString, getConvertedDateTime } from '../common/Utilities';
import { useModalConfig } from "../../contexts/ModalConfigContext";
import { AuthContext } from "../../contexts/AuthContext";
import { useModal } from "../../contexts/ModalContext";
import { space_banner } from '../../assets/img';
import ComboComment from './ComboComment';
import Delete from './Delete';

export default function Comment ({ comment }) {
  const { id, user: comment_user, created_date, text, post } = comment;
  const { isAuthenticated, user } = useContext(AuthContext);
  const { updateConfig } = useModalConfig();
  const { openModal } = useModal();

  const handleClick = (e) => {
    const type = e.target.getAttribute('data-type');
    updateConfig({ type });

    switch(type) {
      case "comment":
        openModal(<Delete data={{ id, postId: post }} />);
        break;
      case "update":
        openModal(<ComboComment data={{ id, text, postId: post }} />);
        break;
      default:
        return;
    }
  }

  return (
    <div className="comment-box" style={{ backgroundImage: `url(${space_banner})`}}>
      <div className="comment-title">
        <Link to={`/users/${comment_user.id}`}>{ comment_user.username }</Link> on { getFormalDateString(created_date) } at { getConvertedDateTime(created_date) }
      </div>

      <div className={`comment-body${!isAuthenticated ? '-unauth' : ''}`} >{text}</div>

      {(isAuthenticated && user && comment_user.id == user.id) &&
        <Fragment>
          <button type="button" className="comment-delete" data-type="comment" onClick={handleClick}>Delete</button>
          <button type="button" className="comment-edit" data-type="update" onClick={handleClick}>Edit</button>
        </Fragment>
      }
    </div>
  )
}

Comment.propTypes = {
  comment: PropTypes.object,
};