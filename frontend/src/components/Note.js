import React from "react";
import { Link } from "react-router-dom";
import { formatDate } from "../scripts/formatDate";

const Note = ({ by, content, noteDate, edited, editedBy }) => {
  return (
    <div className="note m-top-10">
      <div className="flex">
        <div className="profile-image m-right-10">{by[0]}</div>
        <div>
          <p>
            <Link className="bold blueish-font">{by}</Link> added a private note
          </p>
          <p className="m-top-5 note-date"> {formatDate(noteDate)} </p>
        </div>
      </div>

      <p className="m-top-10 note-content"> {content} </p>
    </div>
  );
};

export default Note;
