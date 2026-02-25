import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { setAuthToken } from "./api/api";
import { getToken } from "./utils/auth";

const token = getToken();
if (token) {
  setAuthToken(token);
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
