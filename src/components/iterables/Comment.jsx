import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { getFormalDateString, getConvertedDateTime } from '../common/Utilities';


export default function Comment ({ comment, showDeleteModal, showCommentModal }) {
  const { id, user: comment_user, created_date, text, post } = comment;
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="comment-box">
      <div className="comment-title">
        <Link to={`/users/${comment_user.id}`}>{ comment_user.username }</Link> on { getFormalDateString(created_date) } at { getConvertedDateTime(created_date) }
      </div>

      <div className={`comment-body${!isAuthenticated ? '-unauth' : ''}`} >{text}</div>

      {(isAuthenticated && comment_user.id == user.id) &&
        <Fragment>
          <button type="button" className="comment-delete" onClick={() => showDeleteModal(false, id, '')}>Delete</button>
          <button type="button" className="comment-edit" onClick={() => showCommentModal(post, id, text)}>Edit</button>
        </Fragment>
      }
    </div>
  )
}

Comment.propTypes = {
  isAuthenticated: PropTypes.bool,
  user: PropTypes.object,
  comment: PropTypes.object,
  showDeleteModal: PropTypes.func,
  showCommentModal: PropTypes.func
};