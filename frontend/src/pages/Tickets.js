import React from "react";
import useFetchData from "../hooks/useFetchData";
import NavBar from "../components/NavBar";
import TopBar from "../components/TopBar";
import TicketCard from "../components/TicketCard";

const Tickets = () => {
  const {
    data: tickets,
    loaded,
    error,
  } = useFetchData({ url: "/api/ticket/get-tickets" });

  return (
    <div className="ticket-page">
      <NavBar />
      <TopBar title="Tickets" />
      <div className="bottom-bar">
        <span>bottom-bar</span>
      </div>

      <div className="tickets-container">
        {loaded ? (
          <table>
            <tbody>
              {tickets.map((ticket) => {
                return (
                  <TicketCard
                    key={ticket._id}
                    contact={ticket.contact}
                    subject={ticket.subject}
                    group={ticket.group}
                    agent={ticket.agent}
                    priority={ticket.priority}
                    status={ticket.status}
                    ticket_number={ticket.ticket_number}
                  />
                );
              })}
            </tbody>
          </table>
        ) : (
          <div className="loading"></div>
        )}
      </div>
    </div>
  );
};

export default Tickets;
