import { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Gravatar from 'react-gravatar';
import { getFormalDateString, getConvertedDateTime } from '../common/Utilities';
import { getUser, getUserPosts, getUserComments } from "../../services/user.service";
// import { PostDataService } from "../../services/post.service";
import Loader from '../common/Loader';
// import '../css/layout/Blog.css';
// import '../css/layout/User.css';

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
  
  // const fetchData = async () => {
  //   await getUser(id)
  //   .then(response => {
  //     console.log(response)
  //     setState({ ...state, user: response.data[0].fields });
  //   })
  //   .catch(error => {
  //     console.log(error);
  //   });
  // }

  // getUserPosts = async (id) => {
  //   await UserDataService.getUserPosts(id)
  //     .then(response => {
  //       let showTruncatedText = {};

  //       response.data.forEach((post, index) => {
  //         showTruncatedText[index] = true;
  //       });
        
  //       setState({ ...state, posts: response.data, showTruncatedText });
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // }

  // getUserComments = async (id) => {
  //   await UserDataService.getUserComments(id)
  //     .then(response => {
  //       this.asyncForEach(response.data, async (comment) => {
  //         comment.title = await this.getPostTitle(comment.post);
  //       });

  //       setState({ ...state, comments: response.data });
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // }

  // asyncForEach = async (array, callback) => {
  //   for (let index = 0; index < array.length; index++) {
  //     await callback(array[index], index, array);
  //   }
  // }

  const setTruncatedTextState = (index) => {
    let showTruncatedText = state.showTruncatedText;
    showTruncatedText[index] = !state.showTruncatedText[index];
    setState({ ...state, showTruncatedText });
  }

  // getPostTitle = async (id) => {
  //   return await PostDataService.getPost(id)
  //   .then(response => {
  //     return response.data.post.title;
  //   })
  //   .catch(error => {
  //     console.log(error);
  //   });
  // }   

  return (
    <section>
      {(user && Object.keys(user).length > 0 && posts && comments) ?
        <div className="row user-title-row">
          <div className="col-md-4">
            <h4><Gravatar email={user.email} className="user-gravatar" /><strong>{user.username}</strong></h4>
          </div>
          <div className="col-md-4">
            <div className="row">
              <h6 className="user-title"><em>Posts: {posts.length}</em></h6>
            </div>
            <div className="row">
              <h6 className="user-title"><em>Comments: {comments.length}</em></h6>
            </div>
          </div>
          <div className="col-md-4">
            <div className="row">
              <h6><em>Joined: {getFormalDateString(user.date_joined)}</em></h6>
            </div>
            <div className="row">
              <h6><em>Last Login: {getFormalDateString(user.last_login)} at {getConvertedDateTime(user.last_login)}</em></h6>
            </div>
          </div>
        </div>      
      :
        <Loader />
      }
      <hr className="user-title-hr" />
      {posts ?
        <Fragment>
          {posts.length > 0 ?
            posts.map((post, index) => {
              return (
                <Fragment key={index}>
                  <div className="row daily-row">
                    <div className="col-md-12">
                      <h1>{ post.title }</h1>
                      <p className="lead"><em>Posted by <Link to={`/user/${post.user}`}>{ user.username }</Link> on { getFormalDateString(post.created_date) } at { getConvertedDateTime(post.created_date) }</em></p>
                      {(post.image_url) &&
                        <Fragment>
                          <img className="img-fluid" src={ post.image_url } alt="" />
                          <hr />
                        </Fragment>
                      }
        
                      {state.showTruncatedText[index] ? <p>{post.text.substring(0, 200) + "..."}</p> : <span dangerouslySetInnerHTML={{__html: post.text_html}}></span>}
                      
                      <div className="post-button-box">
                        {state.showTruncatedText[index] ?
                          <button type="button" className="btn btn-success" value="hidden" onClick={() => setTruncatedTextState(index)}>
                            <span className="fa fa-plus" aria-hidden="true"></span>
                            <span className="icon-label">Show More</span>
                          </button>
                        :
                          <button type="button" className="btn btn-success" value="hidden" onClick={() => setTruncatedTextState(index)}>
                            <span className="fa fa-minus" aria-hidden="true"></span>
                            <span className="icon-label">Show Less</span>
                          </button>
                        }
                      </div>
                    </div>
                  </div> 
                  <hr />
                </Fragment>
            )})
          :
            <p><em>{user.username} has not posted...yet.</em></p>
          }
        </Fragment>
      :
        <Loader />
      }

      <h4>Comments:</h4>
      {comments ?
        <Fragment>
          {comments.length > 0 ?
            comments.map((comment, index) => {
              return (
                <div key={index} className="comment-wrapper">
                  <div className="comment-title">
                    <em>
                      <a href="#">{ comment.user.username }</a> on { getFormalDateString(comment.created_date) } at { getConvertedDateTime(comment.created_date) } from the post &quot;<strong>{comment.post_title}</strong>&quot;
                    </em>
                  </div>
                  
                  <div className="comment-body comment-body-unauth">{ comment.text }</div>
                  <br />
                </div> 
            )})
          :
            <p><em>{user.username} has not commented on any posts...yet.</em></p>
          }
        </Fragment>
      :
        <Loader />
      }
    </section>
  );
}