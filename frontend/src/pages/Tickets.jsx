import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar';
import TopBar from '../components/TopBar';
import TicketCard from '../components/TicketCard';
import Filters from '../components/Filters';
import { useFiltersContext } from '../hooks/useFiltersContext';

function Tickets() {
  const { state: filters, loaded } = useFiltersContext();
  const [tickets, setTickets] = useState([]);
  const [render, setRender] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios({
          url: '/api/ticket/get-tickets',
          method: 'GET',
          params: { filters: filters?.selected },
        });
        setTickets(response.data);
        setRender(true);
      } catch (error) {
        setError(error);
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
                  contact={ticket.contact.name}
                  subject={ticket.subject}
                  group={ticket.group}
                  agent={ticket.agent.name}
                  priority={ticket.priority}
                  status={ticket.status}
                  ticket_number={ticket.ticket_number}
                />
              ))}
            </tbody>
          </table>
        ) : (
          <div className="loading" />
        )}
        {render && !tickets.length ? (
          <p className="empty-message">No tickets available</p>
        ) : null}
        {error ? <span className="error">{error}</span> : null}
      </div>
      <Filters />
    </div>
  );
}

export default Tickets;
