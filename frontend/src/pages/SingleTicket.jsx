import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import TopBar from '../components/TopBar';
import ProfileImage from '../components/ProfileImage';
import useFetchData from '../hooks/useFetchData';

import { formatDate } from '../scripts/formatDate';
import Note from '../components/Note';
import AddingNote from '../components/AddingNote';
import { useTicketContext } from '../hooks/useTicketContext';
import { useAuthContext } from '../hooks/useAuthContext';

function SingleTicket() {
  const { agent: currentAgent } = useAuthContext();
  const { ticket_number } = useParams();
  const [displayAddNote, setDisplayAddNote] = useState(false);
  const {
    data: fetchedTicket,
    loaded,
    error,
  } = useFetchData(`/api/ticket/single-ticket/${ticket_number}`);

  const { state: ticket, dispatch } = useTicketContext();

  useEffect(() => {
    if (loaded) {
      dispatch({ type: 'UPDATE', payload: fetchedTicket });
    }
  }, [loaded, dispatch, fetchedTicket]);

  return (
    <div className="single-ticket-page">
      <NavBar />
      <TopBar title={`Tickets - ${ticket_number}`} />

      {ticket ? (
        <div className="single-ticket-container">
          <div className="m-top-20">
            <p className="subject bold"> {ticket?.subject} </p>
            <p>
              Created by <span className="bold">{ticket?.createdBy.name}</span>
            </p>
          </div>

          <div className="m-top-20 flex">
            <ProfileImage profile={ticket.contact} />
            <div>
              <p>
                <Link className="bold blueish-font">
                  {ticket?.contact.name}
                </Link>
              </p>
              <p className="note-date">
                {ticket?.date ? formatDate(ticket?.date) : null}
              </p>
            </div>
          </div>

          <div className="m-top-50 description">
            <p> {ticket?.description} </p>
          </div>

          {ticket?.notes.map((note) => (
            <Note
              key={note._id}
              note_id={note._id}
              by={note.by}
              content={note.content}
              noteDate={note.noteDate}
              edited={note.edited}
              editedBy={note.editedBy}
            />
          ))}

          {displayAddNote ? (
            <AddingNote
              setDisplayAddNote={setDisplayAddNote}
              ticket_number={ticket_number}
            />
          ) : (
            <div className="add-note-div m-top-20">
              <ProfileImage profile={currentAgent} />
              <button
                className="add-note"
                onClick={() => setDisplayAddNote(true)}
              >
                Add note
              </button>
            </div>
          )}
        </div>
      ) : null}

      {error ? <div className="error"> {error} </div> : null}
    </div>
  );
}

export default SingleTicket;
