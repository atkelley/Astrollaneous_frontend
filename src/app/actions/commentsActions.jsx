import { addComment, editComment, removeComment } from "../../services/post.service";
import { getUserComments } from "../../services/user.service";
import { showAlert } from "../../app/slices/alertSlice";
import { fetchPost } from "./postsActions";


export const fetchUserComments = (userId) => async (dispatch) => {
  await getUserComments(userId).then(response => {
    dispatch({ type: "SET_USER_COMMENTS", payload: response.data });
  }).catch(error => {
    console.log(error);
  });
};

export const createComment = (postId, comment) => async (dispatch) => {
  const token = localStorage.getItem("token");

  await addComment({ post: postId, text: comment }, { headers: { 'Authorization': `Token ${token}` } }).then(response => {
    dispatch(fetchPost(postId));
    dispatch({ type: "CREATE_OR_UPDATE_COMMENT", payload: response.data });
  }).catch(error => {
    console.log(error);
  });
}

export const updateComment = (id, comment, postId) => async (dispatch) => {
  const token = localStorage.getItem("token");

  await editComment(id, { post: postId, text: comment }, { headers: { 'Authorization': `Token ${token}` } }).then(response => {
    dispatch(fetchPost(postId));
    dispatch({ type: "CREATE_OR_UPDATE_COMMENT", payload: response.data });
  }).catch(error => {
    console.log(error);
  });
};

export const deleteComment = (id, postId) => async (dispatch) => {
  const token = localStorage.getItem("token");

  await removeComment(id, { headers: { 'Authorization': `Token ${token}` } }).then(_ => {
    dispatch(showAlert({ message: "Your comment has been successfully deleted.", type: 'success' }));
    dispatch({ type: "DELETE_COMMENT", payload: id });
    dispatch(fetchPost(postId));
  }).catch(error => {
    console.log(error);
  });
};