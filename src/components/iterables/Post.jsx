import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { getFormalDateString, getConvertedDateTime } from '../common/Utilities';
import Comment from './Comment';

export default function Post({ post, showDeleteModal, showCommentModal }) {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  console.log(user)
  const [showTruncatedText, setShowTruncatedText] = useState(true);
  const { id, title, created_date, image_url, text, text_html, comments } = post;

  return (
    <div className="post-box">
      <h1 className="mt-3">{ title }</h1>
      <p className="lead">Posted by <Link to={`/users/${post.user.id}`}>{ post.user.username }</Link> on { getFormalDateString(created_date) } at { getConvertedDateTime(created_date) }</p>
      <hr className="post-hr" />
      <img className="post-image" src={image_url} alt="" />
      <hr className="post-hr" />

      {showTruncatedText ?
        <p>{text.substring(0, 200) + "..."}</p>
      :
        <>
          <span dangerouslySetInnerHTML={{__html: text_html}}></span>
          <hr className="post-hr" />
          <h4>Comments:</h4>
          {comments.length > 0 ?
            comments.map((comment, index) => <Comment key={index} comment={comment} showDeleteModal={showDeleteModal} showCommentModal={showCommentModal} />)
          :
            <p>No comments posted...yet.</p>
          }
        </>
      }

      <hr />
      <div className="post-buttons-box">
        {showTruncatedText ?
          <button type="button" className="btn btn-success" value="hidden" onClick={() => setShowTruncatedText(!showTruncatedText)}>
            <span className="fa fa-plus" aria-hidden="true"></span>
            <span className="icon-label">Show More ({comments.length})</span>
          </button>
        :
          <button type="button" className="btn btn-success" value="hidden" onClick={() => setShowTruncatedText(!showTruncatedText)}>
            <span className="fa fa-minus" aria-hidden="true"></span>
            <span className="icon-label">Show Less</span>
          </button>
        }

        {(isAuthenticated && user.id == post.user.id) &&
          <>
            <button type="button" className="btn btn-danger" data-toggle="modal" data-target='#deleteModal' onClick={() => showDeleteModal(true, id, title)}>
              <span className="fa fa-remove" aria-hidden="true"></span>
              <span className="icon-label">Delete Post</span>
            </button>

            {/* <Link to={`/blog/update/${id}`} type="button" className="btn btn-warning">
              <span className="fa fa-edit" aria-hidden="true"></span>
              <span className="icon-label">Edit Post</span>
            </Link> */}

            <button type="button" className="btn btn-warning" data-toggle="modal" data-target='#deleteModal' onClick={() => showDeleteModal(true, id, title)}>
              <span className="fa fa-edit" aria-hidden="true"></span>
              <span className="icon-label">Edit Post</span>
            </button>
          </>
        }

        {isAuthenticated &&
          <button type="button" className="btn btn-primary" data-toggle="modal" data-target='#commentModal' onClick={() => showCommentModal(id, -1, '')}>
            <span className="far fa-comments" aria-hidden="true"></span>
            <span className="icon-label">Add Comment</span>
          </button>
        }
      </div>
    </div>
  );
}

Post.propTypes = {
  post: PropTypes.object,
  showDeleteModal: PropTypes.func,
  showCommentModal: PropTypes.func,
  user: PropTypes.object,
};