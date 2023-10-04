import { createContext, useReducer } from "react";

export const TicketContext = createContext();

const ticketReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE":
      if (action.payload) {
        return { ...state, ...action.payload };
      } else {
        // in case action.payload is null to delete the ticket in context the code above would not work
        // because the state in ...state would be returned again.
        // for that reason in here null is returned instead.
        return null;
      }
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
      value={{ ticket: state, dispatch, updateTicket, addNote, deleteNote }}>
      {children}
    </TicketContext.Provider>
  );
}
