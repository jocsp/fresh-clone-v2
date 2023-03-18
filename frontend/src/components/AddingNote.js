import React, { useState } from "react";
import axios from "../api/axios";
import { useAuthContext } from "../hooks/useAuthContext";
import { useTicketContext } from "../hooks/useTicketContext";

const AddingNote = ({ setDisplayAddNote, ticket_number }) => {
  const [noteContent, setNoteContent] = useState();
  const { agent } = useAuthContext();
  const { dispatch } = useTicketContext();
  const [error, setError] = useState(null);

  async function addNote(e) {
    e.preventDefault();

    const data = {
      by: agent.name,
      content: noteContent,
      noteDate: new Date(),
      ticket_number: ticket_number,
    };

    try {
      setError(null);
      const response = await axios({
        method: "POST",
        url: "api/note/add-note",
        data: data,
      });

      dispatch({ type: "ADD-NOTE", payload: response.data });

      setDisplayAddNote(false);
    } catch (error) {
      setError(error);
    }
  }

  return (
    <form className="m-top-10" onSubmit={addNote}>
      <div className="note-textarea-container">
        <textarea
          value={noteContent}
          onChange={(e) => setNoteContent(e.target.value)}
          className="note-textarea"
          placeholder="Add note here..."
        ></textarea>
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
    </form>
  );
};

export default AddingNote;
