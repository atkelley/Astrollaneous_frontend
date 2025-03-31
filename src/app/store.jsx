import { configureStore } from "@reduxjs/toolkit"
import alertReducer from "./slices/alertSlice";
import { authReducer } from "./reducers/authReducer";
import { postsReducer } from "./reducers/postsReducer";

export default configureStore ({
  reducer: {
    alert: alertReducer,
    auth: authReducer,
    posts: postsReducer,
  },
});