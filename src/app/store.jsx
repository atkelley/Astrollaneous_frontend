import { configureStore } from "@reduxjs/toolkit"
import alertReducer from "./slices/alertSlice";
import { postsReducer } from "./reducers/postsReducer";

export default configureStore ({
  reducer: {
    alert: alertReducer,
    posts: postsReducer,
  },
});