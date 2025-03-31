import { getPost, getPosts, addPost, editPost, removePost } from "../../services/post.service";

export const fetchPost = (postId) => async (dispatch) => {
  await getPost(postId).then(response => {
    dispatch({ type: "UPDATE_POST", payload: response.data });
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
  await addPost(post).then(response => {
    dispatch({ type: 'CREATE_OR_UPDATE_POST', payload: response.data });
  }).catch(error => {
    console.log(error);
  });
}

export const updatePost = (post) => async (dispatch) => {
  await editPost(post).then(response => {
    dispatch({ type: 'CREATE_OR_UPDATE_POST', payload: response.data });
  }).catch(error => {
    console.log(error);
  });
};

export const deletePost = (id) => async (dispatch) => {
  await removePost(id).then(_ => {
    dispatch({ type: 'DELETE_POST', payload: id });
  }).catch(error => {
    console.log(error);
  });
};