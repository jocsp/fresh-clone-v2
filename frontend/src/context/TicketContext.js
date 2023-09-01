import { createContext, useEffect, useReducer, useParams } from "react";
import useFetchData from "../hooks/useFetchData";

export const TicketContext = createContext();

const ticketReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE":
      return { ...state, ...action.payload };
    case "ADD-NOTE":
      const { notes } = state;
      return { ...state, notes: [...notes, action.payload] };

    case "DELETE-NOTE":
      const updatedNotes = state.notes.filter(
        (note) => note._id !== action.payload._id
      );

      return { ...state, notes: updatedNotes };

    default:
      return { ...state };
  }
};

export function TicketContextProvider({ children }) {
  const [state, dispatch] = useReducer(ticketReducer, null);

  const updateTicket = (ticket) => {
    dispatch({ type: "UPDATE", payload: ticket });
  };

  const addNote = (note) => {
    dispatch({ type: "ADD-NOTE", payload: note });
  };

  const deleteNote = (noteId) => {
    dispatch({ type: "DELETE-NOTE", payload: { _id: noteId } });
  };

  return (
    <TicketContext.Provider
      value={{ ticket: state, dispatch, updateTicket, addNote, deleteNote }}
    >
      {children}
    </TicketContext.Provider>
  );
}
