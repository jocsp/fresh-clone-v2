import React, { useState, useEffect, useRef } from "react";
import { useTicketContext } from "../hooks/useTicketContext";

import ProfileImage from "./ProfileImage";
import CustomizedMenus from "./Submenu";
import { UilEdit } from "@iconscout/react-unicons";
import { Link } from "react-router-dom";
import { formatDateAgo } from "../scripts/dateScripts";
import { useAuthContext } from "../hooks/useAuthContext";
import useRequest from "../hooks/useRequest";

function Note({
  note_id,
  by,
  initialContent,
  noteDate,
  edited,
  editedBy,
  timeEdited,
  reFetch,
}) {
  const { ticket, dispatch } = useTicketContext();
  const { agent: currentAgent } = useAuthContext();
  const [content, setContent] = useState(initialContent);
  const textareaRef = useRef();
  const [editing, setEditing] = useState(false);
  const [rows, setRows] = useState(Math.ceil(content.length / 100));

  const { loading, sendRequest } = useRequest();

  useEffect(() => {
    let lines =
      Math.ceil(content.length / 100) +
      content.replace(/\r/g, "").split(/\n/).length -
      1;

    if (editing && lines < 3) {
      lines = 3;
    } else if (lines < 1) {
      lines = 1;
    }

    if (lines !== rows) {
      setRows(lines);
    }
  }, [content, editing, rows]);

  const editNote = () => {
    setEditing(true);
    textareaRef.current.focus();
    textareaRef.current.setSelectionRange(content.length, content.length);
  };

  const cancelEdition = () => {
    setEditing(false);
    setContent(initialContent);
  };

  const updateNote = async () => {
    await sendRequest({
      method: "POST",
      url: "/api/note/update",
      data: { content, note_id, editedBy: currentAgent.name },
    });

    setEditing(false);
    reFetch();
  };

  const subMenuItems = [{ text: "Edit", icon: <UilEdit />, event: editNote }];

  const deleteNote = async () => {
    try {
      await sendRequest({
        url: "/api/note/delete",
        method: "DELETE",
        data: { note_id, ticket_id: ticket._id },
      });

      dispatch({ type: "DELETE-NOTE", payload: { _id: note_id } });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="note m-top-10">
      <div className="flex-between">
        <div className="flex">
          <ProfileImage profile={by} />
          <div>
            <p>
              <Link className="bold blueish-font">{by.name}</Link> added a
              private note
            </p>
            <p className="m-top-5 small-lighter"> {formatDateAgo(noteDate)} </p>
          </div>
        </div>

        <CustomizedMenus items={subMenuItems} deleteHandler={deleteNote} />
      </div>
      {edited ? (
        <p className="m-top-10 note-edited">
          {" "}
          Last time <span className="bold">edited</span> by{" "}
          <span className="bold">{editedBy}</span> {formatDateAgo(timeEdited)}{" "}
        </p>
      ) : null}

      <textarea
        ref={textareaRef}
        rows={rows}
        className={
          editing
            ? "m-top-10 note-content padding-5-10"
            : "m-top-10 note-content fixed-note"
        }
        value={content}
        onChange={(e) => setContent(e.target.value)}
        readOnly={!editing}
      />
      {editing ? (
        <div className="note-buttons">
          <button
            disabled={content === initialContent}
            className="button-default dark-bc m-right-10"
            onClick={updateNote}>
            {!loading ? "Update" : "Loading..."}
          </button>
          <button className="button-default" onClick={cancelEdition}>
            Cancel
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default Note;
