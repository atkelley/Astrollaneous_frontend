import { Link } from 'react-router-dom';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { getFormalDateString, getConvertedDateTime } from '../common/Utilities';
import Comment from './Comment';

export default function Post({ post, showDeleteModal, showCommentModal }) {
  const [showTruncatedText, setShowTruncatedText] = useState(true);
  const { id, title, created_date, image_url, text, text_html, comments } = post;
  const post_user = { id: post.user, username: "Admin" };

  return (
      <article>

            <h1 className="mt-3">{ title }</h1>
            <p className="lead"><em>Posted by <Link to={`/user/${post_user.id}`}>{ post_user.username }</Link> on { getFormalDateString(created_date) } at { getConvertedDateTime(created_date) }</em></p>
            <hr />
            {image_url &&
              <>
                <img className="img-fluid" src={ image_url } alt="" />
                <hr />
              </>
            }

            {showTruncatedText ?
              <p>{text.substring(0, 200) + " ..."}</p>
            :
              <>
                <span dangerouslySetInnerHTML={{__html: text_html}}></span>
                <hr />
                <h4>Comments:</h4>
                {comments.length > 0 ?
                  <>
                    {comments.map((comment, index) => {
                      return <Comment key={index} comment={comment} showDeleteModal={showDeleteModal} showCommentModal={showCommentModal} />
                    })}
                  </>
                :
                  <p><em>No comments posted...yet.</em></p>
                }
              </>
            }

            <hr />
            <div className="post-button-box">
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

              {/* {(this.props.isAuthenticated && this.props.user.id == post_user.id) && */}
                <>
                  <button type="button" className="btn btn-danger" data-toggle="modal" data-target='#deleteModal' onClick={() => showDeleteModal(true, id, title)}>
                    <span className="fa fa-remove" aria-hidden="true"></span>
                    <span className="icon-label">Delete Post</span>
                  </button>

                  <Link to={`/blog/update/${id}`} type="button" className="btn btn-warning">
                    <span className="fa fa-edit" aria-hidden="true"></span>
                    <span className="icon-label">Edit Post</span>
                  </Link>
                </>
              {/* } */}

              {/* {this.props.isAuthenticated && */}
                <button type="button" className="btn btn-primary" data-toggle="modal" data-target='#commentModal' onClick={() => showCommentModal(id, -1, '')}>
                  <span className="far fa-comments" aria-hidden="true"></span>
                  <span className="icon-label">Add Comment</span>
                </button>
              {/* } */}
            </div>

      </article>
  );
}

Post.propTypes = {
  post: PropTypes.object,
  showDeleteModal: PropTypes.func,
  showCommentModal: PropTypes.func,
  user: PropTypes.object,
};