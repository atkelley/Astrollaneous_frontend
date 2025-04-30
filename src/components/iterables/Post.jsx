import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { getFormalDateString, getConvertedDateTime } from "../common/Utilities";
import { useModalConfig } from "../../contexts/ModalConfigContext";
import { AuthContext } from "../../contexts/AuthContext";
import { useModal } from "../../contexts/ModalContext";
import ComboComment from "./ComboComment";
import ComboPost from "./ComboPost";
import Comment from "./Comment";
import Delete from "./Delete";


export default function Post({ post }) {
  const { id, title, created_date, image_url, text, text_html, comments } = post;
  const [showTruncatedText, setShowTruncatedText] = useState(true);
  const { isAuthenticated, user } = useContext(AuthContext);
  const { updateConfig } = useModalConfig();
  const { openModal } = useModal();

  const handleClick = (e) => {
    const type = e.target.getAttribute('data-type');
    updateConfig({ type });

    switch(type) {
      case "post":
        openModal(<Delete data={{ id, title }} />);
        break;
      case "update":
        openModal(<ComboPost data={{ id, title, image_url, text_html }} />);
        break;
      case "create":
        openModal(<ComboComment data={{ postId: id }} />);
        break;
      default:
        return;
    }
  }

  return (
    <div className="post-box">
      <h1 className="post-box-title">{title}</h1>
      <p className="post-box-subtitle">
        Posted by <Link to={`/users/${post.user.id}`}>{ post.user.username }</Link> on {getFormalDateString(created_date)} at {getConvertedDateTime(created_date)}
      </p>
      <hr className="post-box-hr" />
      <div
        className="post-box-image"
        style={{
          backgroundImage: image_url ? `url(${image_url})` : "linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)",
          backgroundSize: 'cover', 
          backgroundRepeat: 'no-repeat'
        }}
      ></div>
      <hr className="post-box-hr" />

      {showTruncatedText ?
        <span className="post-box-text" dangerouslySetInnerHTML={{__html: text_html.substring(0, 200) + "..."}}></span>
      :
        <>
          <span className="post-box-text" dangerouslySetInnerHTML={{__html: text_html}}></span>
          <hr className="post-box-hr" />
          <h4 className="post-box-comments">Comments:</h4>
          {comments.length > 0 ?
            comments.map((comment, index) => <Comment key={index} comment={comment} />)
          :
            <p className="post-box-text">No comments posted...yet.</p>
          }
        </>
      }

      <hr />
      <div className="post-box-buttons">
        {showTruncatedText ?
          <button type="button" className="btn btn-success" value="hidden" onClick={() => setShowTruncatedText(!showTruncatedText)}>
            <span className="fa fa-plus" aria-hidden="true"></span>
            <span className="icon-label">Show More</span>
          </button>
        :
          <button type="button" className="btn btn-success" value="hidden" onClick={() => setShowTruncatedText(!showTruncatedText)}>
            <span className="fa fa-minus" aria-hidden="true"></span>
            <span className="icon-label">Show Less</span>
          </button>
        }

        {(isAuthenticated && user && post.user.id === user.id) &&
          <> 
            <button type="button" className="btn btn-danger" data-type="post" onClick={handleClick}>Delete Post</button>
            <button type="button" className="btn btn-warning" data-type="update" onClick={handleClick}>Edit Post</button>
          </>
        }

        {isAuthenticated &&
          <button type="button" className="btn btn-primary" data-type="create" onClick={handleClick}>Add Comment ({comments.length})</button>
        }
      </div>
    </div>
  );
}

Post.propTypes = {
  post: PropTypes.object
};