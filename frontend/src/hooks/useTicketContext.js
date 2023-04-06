import { useContext } from 'react';
import { TicketContext } from '../context/TicketContext';

export const useTicketContext = () => {
  const context = useContext(TicketContext);

  if (!context) {
    throw Error(
      'useFiltersContext must be used inside an TicketContextProvider',
    );
  }

  return context;
};
