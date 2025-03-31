import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
import { ModalConfigProvider } from "./contexts/ModalConfigContext.jsx";
import { ModalProvider } from "./contexts/ModalContext";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./app/store.jsx";
import App from "./App.jsx";
import "./scss/main.scss";


createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <ModalConfigProvider>
        <ModalProvider>
          <StrictMode>
            <App />
          </StrictMode>
        </ModalProvider>
      </ModalConfigProvider>
    </Provider>
  </BrowserRouter>
)
