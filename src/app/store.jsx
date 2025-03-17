import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './slices/counterSlice';
import { authApiSlice } from './slices/authApiSlice';

export default configureStore ({
  reducer: {
    counter: counterReducer,
    [authApiSlice.reducerPath]: authApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApiSlice.middleware),
});