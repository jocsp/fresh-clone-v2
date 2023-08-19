import React, { useEffect, useRef, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useTicketContext } from '../hooks/useTicketContext';
import useRequest from '../hooks/useRequest';

function AddingNote({ setDisplayAddNote, ticket_number }) {
  const [noteContent, setNoteContent] = useState();
  const { agent } = useAuthContext();
  const { addNote } = useTicketContext();
  const textareaRef = useRef();
  const { sendRequest, loading, error } = useRequest();

  async function handleSubmit(e) {
    e.preventDefault();

    const data = {
      by: { name: agent.name, _id: agent._id },
      content: noteContent,
      noteDate: new Date(),
      ticket_number,
    };

    try {
      const response = await sendRequest({
        method: 'POST',
        url: 'api/note/add-note',
        data,
      });

      addNote(response.data);

      setDisplayAddNote(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    textareaRef.current.focus();
  }, []);

  return (
    <form className="m-top-10" onSubmit={handleSubmit}>
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
          {!loading ? 'Add note' : 'Loading...'}
        </button>
      </div>

      {error ? <div className="error">{error}</div> : null}
    </form>
  );
}

export default AddingNote;
