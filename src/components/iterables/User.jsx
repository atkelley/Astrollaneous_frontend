import { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import Gravatar from 'react-gravatar';
import { getFormalDateString, getConvertedDateTime } from '../common/Utilities';
import { getUser, getUserPosts, getUserComments } from "../../services/user.service";
import Loader from '../common/Loader';
import Post from './Post';
import Comment from './Comment';


export default function User () {
  const [state, setState] = useState({ user: {}, posts: null, comments: null, showTruncatedText: {} })
  const { user, posts, comments } = state;
  const { id } = useParams();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await Promise.all([
      getUser(id),
      getUserPosts(id),
      getUserComments(id),
    ]).then(([user, { data: posts }, {data: comments }]) => {
      let showTruncatedText = {};

      posts.forEach((_, index) => {
        showTruncatedText[index] = true;
      })

      setState({ user: user.data[0].fields, posts, comments, showTruncatedText });
    }).catch(error => {
      console.error('Error fetching data:', error);
    });
  }

  return (
    (user && Object.keys(user).length > 0 && posts && comments) ?
      <main className="user">
        <section className="user-header">
          <div className="user-header-info">
            <Gravatar email={user.email} className="user-gravatar" />
            <div className="user-header-text">
              <p>
                <span className="user-header-attribute">Username: </span>
                <span className="user-header-value">{user.username}</span>
              </p>
              <p>
                <span className="user-header-attribute">Email: </span>
                <span className="user-header-value">{user.email}</span>
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
                <span className="user-header-value">{getFormalDateString(user.date_joined)}</span>
              </p>
              <p>
                <span className="user-header-attribute">Last login: </span>
                <span className="user-header-value">{getFormalDateString(user.last_login)} at {getConvertedDateTime(user.last_login)}</span>
              </p>
            </div>
          </div>
        </section>      

        <section className="user-posts">
          <h4 className="user-posts-title">User Posts:</h4>
          {posts.length > 0 ?
            posts.map((post, index) => <Post key={index} post={post} showDeleteModal={() => {}} showCommentModal={() => {}} />)
          :
            <p className="user-posts-no-comment">"{user.username}" has not posted anything...yet.</p>
          }
        </section>

        <section className="user-comments">
          <h4 className="user-comments-title">User Comments:</h4>
          <div className="user-comments-wrapper"> 
            {comments.length > 0 ?
              comments.map((comment, index) => {return (
                <Fragment key={index} >
                  <p className="user-comment-post-title">From "{comment.post_title}":</p>
                  <Comment comment={comment} showDeleteModal={() => {}} showCommentModal={() => {}} />
                </Fragment>
              )})
            :
              <p className="user-comments-no-comment">"{user.username}" has not commented on any posts...yet.</p>
            }

          </div>
        </section>

      </main>
    :
      <Loader />
  );
}