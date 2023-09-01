import React, { useEffect, useState } from "react";

import NavBar from "../components/NavBar";
import TopBar from "../components/TopBar";
import TicketCard from "../components/TicketCard";
import Filters from "../components/Filters";
import { useFiltersContext } from "../hooks/useFiltersContext";
import useRequest from "../hooks/useRequest";

function Tickets() {
  const { state: filters, loaded } = useFiltersContext();
  const [tickets, setTickets] = useState([]);
  const [render, setRender] = useState(false);
  const [error, setError] = useState(null);
  const { sendRequest } = useRequest();

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await sendRequest({
          url: "/api/ticket/get-tickets",
          method: "GET",
          params: { filters: filters?.selected },
        });
        setTickets(response.data);
        setRender(true);
      } catch (error) {
        console.log(error);
        setError(error.response.data.error);
      }
    };

    setRender(false);

    if (loaded) {
      fetchTickets();
    }
  }, [filters, loaded]);

  return (
    <div className="ticket-page">
      <NavBar />
      <TopBar title="Tickets" />
      <div className="bottom-bar">
        <span>bottom-bar</span>
      </div>

      <div className="tickets-container">
        {render ? (
          <table>
            <tbody>
              {tickets.map((ticket) => (
                <TicketCard
                  key={ticket._id}
                  contact={ticket.contact}
                  subject={ticket.subject}
                  group={ticket.group.name}
                  agent={ticket.agent.name}
                  priority={ticket.priority.name}
                  status={ticket.status.name}
                  ticket_number={ticket.ticket_number}
                />
              ))}
            </tbody>
          </table>
        ) : (
          <div className="loading" />
        )}
        {render && !tickets.length ? (
          <p className="empty-message">No tickets found</p>
        ) : null}
        {error ? <span className="error">{error}</span> : null}
      </div>
      <Filters />
    </div>
  );
}

export default Tickets;
