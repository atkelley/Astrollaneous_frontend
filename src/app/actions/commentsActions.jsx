import { addComment, editComment, removeComment } from "../../services/post.service";
import { showAlert } from "../../app/slices/alertSlice";
import { fetchPost } from "./postsActions";

export const createComment = (postId, comment) => async (dispatch) => {
  const token = localStorage.getItem("token");

  await addComment({ post: postId, text: comment }, { headers: { 'Authorization': `Token ${token}` } }).then(_ => {
    dispatch(fetchPost(postId));
  }).catch(error => {
    console.log(error);
  });
}

export const updateComment = (id, comment, postId) => async (dispatch) => {
  const token = localStorage.getItem("token");

  await editComment(id, { post: postId, text: comment }, { headers: { 'Authorization': `Token ${token}` } }).then(_ => {
    dispatch(fetchPost(postId));
  }).catch(error => {
    console.log(error);
  });
};

export const deleteComment = (id, postId) => async (dispatch) => {
  const token = localStorage.getItem("token");

  await removeComment(id, { headers: { 'Authorization': `Token ${token}` } }).then(_ => {
    dispatch(showAlert({ message: "Your comment has been successfully deleted.", type: 'success' }));
    dispatch(fetchPost(postId));
  }).catch(error => {
    console.log(error);
  });
};