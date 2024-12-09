import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import App from "./App";
// import { counterStore } from "./app/counterStore.js";
import { postsStore } from "./app/postsStore.js";
import { fetchUsers } from "./features/users/usersSlice.js";
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

postsStore.dispatch(fetchUsers())

root.render(
  <StrictMode>
    <Provider store={postsStore}>
      <App />
    </Provider>
  </StrictMode>
);
