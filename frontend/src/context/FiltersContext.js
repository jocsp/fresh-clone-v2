import { createContext, useEffect, useState, useReducer } from 'react';

import axios from 'axios';

export const FiltersContext = createContext();

const filtersReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE':
      return { filters: action.payload };
    default:
      return { ...state };
  }
};

export function FiltersContextProvider({ children }) {
  const [state, dispatch] = useReducer(filtersReducer, { filters: null });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const fetchFilters = async () => {
      const response = await axios.get('api/filters/get-filters');

      dispatch({ type: 'UPDATE', payload: response.data });
      setLoaded(true);
    };

    try {
      fetchFilters();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <FiltersContext.Provider value={{ state, loaded, dispatch }}>
      {children}
    </FiltersContext.Provider>
  );
}
