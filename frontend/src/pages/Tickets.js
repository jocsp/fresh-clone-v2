import React from "react";
import NavBar from "../components/NavBar";
import TopBar from "../components/TopBar";

const Tickets = () => {
  return (
    <div>
      <NavBar />
      <TopBar title="Tickets" />
      <div className="bottom-bar">
        <span>bottom-bar</span>
      </div>

      <div className="tickets-container"></div>
    </div>
  );
};

export default Tickets;
