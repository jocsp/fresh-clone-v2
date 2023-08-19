import React from 'react';
import { Link } from 'react-router-dom';

function TicketCard({
  contact,
  subject,
  group,
  agent,
  priority,
  status,
  ticket_number,
}) {
  return (
    <tr className="ticket-card-container">
      <td>
        <input type="checkbox" name="select" /> {contact}
      </td>

      <td>
        <Link to={`/ticket/${ticket_number}`} className="subject-card">
          {subject} <span className="light-font">{` #${ticket_number}`}</span>{' '}
        </Link>
      </td>

      <td> {group} </td>
      <td> {agent} </td>
      <td> {priority} </td>
      <td> {status} </td>
    </tr>
  );
}

export default TicketCard;
