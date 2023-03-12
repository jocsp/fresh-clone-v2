import React from "react";
import NavBar from "../components/NavBar";
import TopBar from "../components/TopBar";
import TicketCard from "../components/TicketCard";

const Tickets = () => {
  return (
    <div className="ticket-page">
      <NavBar />
      <TopBar title="Tickets" />
      <div className="bottom-bar">
        <span>bottom-bar</span>
      </div>

      <div className="tickets-container">
        <table>
          <tbody>
            <TicketCard
              contact="Alfonso Davie"
              subject="CANNOT USE PANO"
              group="Remote support"
              agent="Jose Socorro"
              priority="High"
              status="Open"
              ticket_number="1"
            />
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Tickets;
