import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
// import { applyMiddleware, createStore } from 'redux';
// import { thunk } from 'redux-thunk';
// import rootReducer from './reducers';
import store from "./app/store.jsx";
import App from "./App.jsx";
import "./scss/main.scss";


// const middlewareEnhancer = applyMiddleware(thunk);
// const store = createStore(rootReducer, undefined, middlewareEnhancer);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <StrictMode>
      <App />
    </StrictMode>
  </Provider>
)
