import React from 'react';
import { useTicketContext } from '../hooks/useTicketContext';
import axios from 'axios';
import ProfileImage from './ProfileImage';
import CustomizedMenus from './Submenu';
import { Link } from 'react-router-dom';
import { formatDate } from '../scripts/formatDate';

function Note({ note_id, by, content, noteDate, edited, editedBy }) {
  const { dispatch } = useTicketContext();
  const deleteNote = async () => {
    try {
      const response = await axios({
        url: '/api/note/delete',
        method: 'DELETE',
        data: { note_id },
      });

      dispatch({ type: 'DELETE-NOTE', payload: { _id: note_id } });
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
            <p className="m-top-5 note-date"> {formatDate(noteDate)} </p>
          </div>
        </div>

        <CustomizedMenus items={[]} deleteHandler={deleteNote} />
      </div>

      <p className="m-top-10 note-content"> {content} </p>
    </div>
  );
}

export default Note;
