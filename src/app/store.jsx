import { configureStore } from "@reduxjs/toolkit"
import alertReducer from "./slices/alertSlice";
import { postsReducer } from "./reducers/postsReducer";
import { commentsReducer } from "./reducers/commentsReducer";

export default configureStore ({
  reducer: {
    alert: alertReducer,
    posts: postsReducer,
    comments: commentsReducer,
  },
});