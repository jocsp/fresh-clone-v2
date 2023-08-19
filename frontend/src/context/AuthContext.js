import { createContext, useReducer, useEffect, useState } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { agent: action.payload };
    case 'LOGOUT':
      return { agent: null };
    case 'ADD-TKTS-ASSGND':
      if (state.agent._id === action.payload.agent) {
        state.agent.ticketsAssigned.push(action.payload.ticket_data);
      }
      return { ...state };
    case 'UPDT-TKTS-ASSGND': // PENDING TO CHANGE THE CODE
      return { ...state };
    case 'ADD-TODO':
      state.agent.todos.push(action.payload);
      return { ...state };
    default:
      return state;
  }
};

export function AuthContextProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, { user: null });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const authorize = async () => {
      const response = await axios.post('api/user/initial-auth');

      if (response.data.authorized) {
        dispatch({ type: 'LOGIN', payload: response.data.agent });
      }

      setLoaded(true);
    };

    authorize();
  }, []);

  const addTicketAssigned = (ticket_id, agent, status) => {
    dispatch({
      type: 'ADD-TKTS-ASSGND',
      payload: { agent, ticket_data: { ticket_id, status: status } },
    });
  };

  return (
    <AuthContext.Provider value={{ ...state, dispatch, addTicketAssigned }}>
      {loaded && children}
    </AuthContext.Provider>
  );
}
