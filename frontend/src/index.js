import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import axios from "axios";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { FiltersContextProvider } from "./context/FiltersContext";
import { TicketContextProvider } from "./context/TicketContext";

switch (process.env.NODE_ENV) {
  case "development":
    axios.defaults.baseURL = "http://localhost:5001";
    break;
  case "production":
    axios.defaults.baseURL = "https://freshsupportapi.joses.dev/";
    break;
}

axios.defaults.withCredentials = true;

console.log(process.env);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <AuthContextProvider>
    <FiltersContextProvider>
      <TicketContextProvider>
        <App />
      </TicketContextProvider>
    </FiltersContextProvider>
  </AuthContextProvider>
  // </React.StrictMode>
);
