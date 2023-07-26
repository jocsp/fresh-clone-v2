import { createContext, useReducer } from 'react';

export const TicketContext = createContext();

const ticketReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE':
      return { ...state, ...action.payload };
    case 'ADD-NOTE':
      const { notes } = state;
      return { ...state, notes: [...notes, action.payload] };

    case 'DELETE-NOTE':
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

  return (
    <TicketContext.Provider value={{ ticket: state, dispatch }}>
      {children}
    </TicketContext.Provider>
  );
}
