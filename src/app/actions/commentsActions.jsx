import { addComment, editComment, removeComment } from "../../services/post.service";
import { fetchPost } from "./postsActions";

export const createComment = (comment, postId) => async (dispatch) => {
  await addComment(comment, postId).then(response => {
    dispatch(fetchPost(postId));
  }).catch(error => {
    console.log(error);
  });
}

export const updateComment = (id, comment, postId) => async (dispatch) => {
  await editComment(id, comment).then(response => {
    dispatch(fetchPost(postId));
  }).catch(error => {
    console.log(error);
  });
};

export const deleteComment = (id, postId) => async (dispatch) => {
  await removeComment(id).then(_ => {
    dispatch(fetchPost(postId));
  }).catch(error => {
    console.log(error);
  });
};