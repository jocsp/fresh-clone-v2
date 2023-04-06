import { createContext, useReducer } from 'react';

export const TicketContext = createContext();

const ticketReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE':
      return { ...state, ...action.payload };
    case 'ADD-NOTE':
      const { notes } = state;
      return { ...state, notes: [...notes, action.payload] };
    default:
      return { ...state };
  }
};

export function TicketContextProvider({ children }) {
  const [state, dispatch] = useReducer(ticketReducer, null);

  return (
    <TicketContext.Provider value={{ state, dispatch }}>
      {children}
    </TicketContext.Provider>
  );
}
