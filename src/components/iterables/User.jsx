import { useState, useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import Gravatar from 'react-gravatar';
import { getFormalDateString, getConvertedDateTime } from '../common/Utilities';
import { fetchUserComments } from '../../app/actions/commentsActions';
import { fetchUserPosts } from "../../app/actions/postsActions";
import { getUser } from "../../services/user.service";
import Loader from '../common/Loader';
import Comment from './Comment';
import Post from './Post';


export default function User() {
  const dispatch = useDispatch();
  const [state, setState] = useState({ user: {}, showTruncatedText: {} })
  const comments = useSelector((state) => state.comments); 
  const posts = useSelector((state) => state.posts);
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchUserPosts(id)); 
    dispatch(fetchUserComments(id));
    fetchUser();
  }, [dispatch, id]);

  const fetchUser = async () => {
    await getUser(id).then(response => {
      setState({ ...state, user: response.data[0].fields });
    }).catch(error => {
      console.log(error);
    });
  };

  return (
    (Object.keys(state.user).length > 0 && posts && comments) ?
      <main className="user">
        <section className="user-header">
          <div className="user-header-info">
            <Gravatar email={state.user.email} className="user-gravatar" />
            <div className="user-header-text">
              <p>
                <span className="user-header-attribute">Username: </span>
                <span className="user-header-value">{state.user.username}</span>
              </p>
              <p>
                <span className="user-header-attribute">Email: </span>
                <span className="user-header-value">{state.user.email}</span>
              </p>
              <p>
                <span className="user-header-attribute">Total posts: </span>
                <span className="user-header-value">{posts.length}</span>
              </p>
              <p>
                <span className="user-header-attribute">Total comments: </span>
                <span className="user-header-value">{comments.length}</span>
              </p>
              <p>
                <span className="user-header-attribute">Joined: </span>
                <span className="user-header-value">{getFormalDateString(state.user.date_joined)}</span>
              </p>
              <p>
                <span className="user-header-attribute">Last login: </span>
                <span className="user-header-value">{getFormalDateString(state.user.last_login)} at {getConvertedDateTime(state.user.last_login)}</span>
              </p>
            </div>
          </div>
        </section>      

        <section className="user-posts">
          <h4 className="user-posts-title">User Posts:</h4>
          <div className="user-posts-wrapper"> 
            {posts.length > 0 ?
              posts.map((post, index) => <Post key={index} post={post} />)
            :
              <p className="user-posts-no-posts">"{state.user.username}" has not posted anything...yet.</p>
            }
          </div>
        </section>

        <section className="user-comments">
          <h4 className="user-comments-title">User Comments:</h4>
          <div className="user-comments-wrapper"> 
            {comments.length > 0 ?
              comments.map((comment, index) => {return (
                <Fragment key={index} >
                  <p className="user-comment-post-title">From "{comment.post_title}":</p>                 
                  <Comment comment={comment} />
                </Fragment>
              )})
            :
              <p className="user-comments-no-comments">"{state.user.username}" has not commented on any posts...yet.</p>
            }

          </div>
        </section>

      </main>
    :
      <Loader />
  );
}
