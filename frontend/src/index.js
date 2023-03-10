import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { FiltersContextProvider } from "./context/FiltersContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <AuthContextProvider>
    <FiltersContextProvider>
      <App />
    </FiltersContextProvider>
  </AuthContextProvider>
  // </React.StrictMode>
);
