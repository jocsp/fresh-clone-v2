import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { FiltersContextProvider } from "./context/FiltersContext";
import { TicketContextProvider } from "./context/TicketContext";

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
