import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import App from "./App";
import { store } from "./app/store";
import UserProvider from "./UserContext";


ReactDOM.createRoot( document.getElementById("root")!, ).render(
  <React.StrictMode>

    <Provider store={store}>
      <UserProvider>
          <App />
      </UserProvider>
    </Provider>

  </React.StrictMode>,
);