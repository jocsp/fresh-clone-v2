import { useContext } from 'react';
import { FiltersContext } from '../context/FiltersContext';

export const useFiltersContext = () => {
  const context = useContext(FiltersContext);

  if (!context) {
    throw Error(
      'useFiltersContext must be used inside an FiltersContextProvider',
    );
  }

  return context;
};
