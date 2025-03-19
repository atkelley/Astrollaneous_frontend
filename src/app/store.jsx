import { configureStore } from "@reduxjs/toolkit"
import alertReducer from "./slices/alertSlice";
import authReducer from "./reducers/authReducer";

export default configureStore ({
  reducer: {
    alert: alertReducer,
    auth: authReducer,
  },
});