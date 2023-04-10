import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useAuthContext } from '../hooks/useAuthContext';
import { useTicketContext } from '../hooks/useTicketContext';

function AddingNote({ setDisplayAddNote, ticket_number }) {
  const [noteContent, setNoteContent] = useState();
  const { agent } = useAuthContext();
  const { dispatch } = useTicketContext();
  const textareaRef = useRef();
  const [error, setError] = useState(null);

  async function addNote(e) {
    e.preventDefault();

    const data = {
      by: { name: agent.name, _id: agent._id },
      content: noteContent,
      noteDate: new Date(),
      ticket_number,
    };

    try {
      setError(null);
      const response = await axios({
        method: 'POST',
        url: 'api/note/add-note',
        data,
      });

      dispatch({ type: 'ADD-NOTE', payload: response.data });

      setDisplayAddNote(false);
    } catch (error) {
      setError(error);
    }
  }

  useEffect(() => {
    textareaRef.current.focus();
  }, []);

  return (
    <form className="m-top-10" onSubmit={addNote}>
      <div className="note-textarea-container">
        <textarea
          ref={textareaRef}
          value={noteContent}
          onChange={(e) => setNoteContent(e.target.value)}
          className="note-textarea"
          placeholder="Add note here..."
        />
      </div>
      <div className="adding-note-bottom-bar">
        <button
          className="button-default"
          onClick={() => setDisplayAddNote(false)}
        >
          Cancel
        </button>
        <button type="submit" className="button-default dark-bc m-left-10">
          Add note
        </button>
      </div>

      {error ? <div className="error">{error}</div> : null}
    </form>
  );
}

export default AddingNote;
