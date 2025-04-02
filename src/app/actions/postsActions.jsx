import { getPost, getPosts, addPost, editPost, removePost } from "../../services/post.service";
import { showAlert } from "../../app/slices/alertSlice";

export const fetchPost = (postId) => async (dispatch) => {
  await getPost(postId).then(response => {
    dispatch({ type: "SET_POST", payload: response.data });
  }).catch(error => {
    console.log(error);
  });
};

export const fetchPosts = () => async (dispatch) => {
  await getPosts().then(response => {
    dispatch({ type: 'SET_POSTS', payload: response.data });
  }).catch(error => {
    console.log(error);
  });
};

export const createPost = (post) => async (dispatch) => {
  const token = localStorage.getItem("token");

  await addPost(post, { headers: { 'Authorization': `Token ${token}` } }).then(response => {
    dispatch({ type: 'CREATE_OR_UPDATE_POST', payload: response.data });
  }).catch(error => {
    console.log(error);
  });
}

export const updatePost = (post) => async (dispatch) => {
  const token = localStorage.getItem("token");

  await editPost(post, { headers: { 'Authorization': `Token ${token}` } }).then(response => {
    dispatch({ type: 'CREATE_OR_UPDATE_POST', payload: response.data });
  }).catch(error => {
    console.log(error);
  });
};

export const deletePost = (id) => async (dispatch) => {
  const token = localStorage.getItem("token");

  await removePost(id, { headers: { 'Authorization': `Token ${token}` } }).then(_ => {
    dispatch(showAlert({ message: "Your post has been successfully deleted.", type: 'success' }));
    dispatch({ type: 'DELETE_POST', payload: id });
  }).catch(error => {
    console.log(error);
  });
};