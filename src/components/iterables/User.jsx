import { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
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

      // console.log('Data from API 1:', user);
      // console.log('Data from API 2:', posts);
      // console.log('Data from API 3:', comments);

      let showTruncatedText = {};
      posts.forEach((_, index) => {
        showTruncatedText[index] = true;
      })

      setState({ user: user.data[0].fields, posts, comments, showTruncatedText });
    }).catch(error => {
      console.error('Error fetching data:', error);
    });
  }

  const setTruncatedTextState = (index) => {
    let showTruncatedText = state.showTruncatedText;
    showTruncatedText[index] = !state.showTruncatedText[index];
    setState({ ...state, showTruncatedText });
  }


  return (
    (user && Object.keys(user).length > 0 && posts && comments) ?
      <main className="user">
        <section className="user-header">
          <h4><Gravatar email={user.email} className="user-gravatar" />{user.username}</h4>
          <h6 className="user-title">Posts: {posts.length}</h6>
          <h6 className="user-title">Comments: {comments.length}</h6>
          <h6>Joined: {getFormalDateString(user.date_joined)}</h6>
          <h6>Last Login: {getFormalDateString(user.last_login)} at {getConvertedDateTime(user.last_login)}</h6>
        </section>      

        <section className="user-posts">
          <h4 className="user-posts-title">User Posts:</h4>
          {posts.length > 0 ?
            posts.map((post, index) => <Post key={index} post={post} showDeleteModal={() => {}} showCommentModal={() => {}} />)
          :
            <p>{user.username} has not posted...yet.</p>
          }
        </section>

        <section className="user-comments">
          <h4 className="user-comments-title">User Comments:</h4>
          <div className="user-comments-wrapper"> 
            {comments.length > 0 ?
              comments.map((comment, index) => <Comment key={index} comment={comment} showDeleteModal={() => {}} showCommentModal={() => {}} />)
            :
              <p>{user.username} has not commented on any posts...yet.</p>
            }

          </div>
        </section>

      </main>
    :
      <Loader />
  );
}