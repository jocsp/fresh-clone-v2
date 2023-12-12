import { createContext, useReducer, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { agent: action.payload };
    case "LOGOUT":
      return { agent: null };
    case "ADD-TKTS-ASSGND":
      if (state.agent._id === action.payload.agent) {
        state.agent.ticketsAssigned.push(action.payload.ticket_data);
      }
      return { ...state };
    case "UPDT-TKTS-ASSGND": // PENDING TO CHANGE THE CODE
      // variable ticket stores the updated ticket sent from the backend
      const { ticket } = action.payload;

      // this if else block will handle the logic for when a ticket is assigned to the current agent
      // or when it is de assigned for the current agent.
      if (ticket.agent === state.agent._id) {
        const index = state.agent.ticketsAssigned.findIndex(
          (tckt) => tckt._id === ticket._id
        );

        if (index === -1) {
          state.agent.ticketsAssigned.push(ticket);
        } else {
          state.agent.ticketsAssigned[index] = ticket;
        }
      } else {
        const index = state.agent.ticketsAssigned.findIndex(
          (tckt) => tckt._id === ticket._id
        );

        if (index !== -1) {
          state.agent.ticketsAssigned.splice(index, 1);
        }
      }

      return { ...state };
    case "ADD-TODO":
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
      const response = await axios.post("api/user/initial-auth");

      if (response.data.authorized) {
        dispatch({ type: "LOGIN", payload: response.data.agent });
      }

      setLoaded(true);
    };

    authorize();
  }, []);

  const addTicketAssigned = (ticket_id, agent, status) => {
    dispatch({
      type: "ADD-TKTS-ASSGND",
      payload: { agent, ticket_data: { ticket_id, status: status } },
    });
  };

  const updateTicketsAssigned = (ticket) => {
    dispatch({
      type: "UPDT-TKTS-ASSGND",
      payload: { ticket },
    });
  };

  return (
    <AuthContext.Provider
      value={{ ...state, dispatch, addTicketAssigned, updateTicketsAssigned }}>
      {/* {loaded && children} */}

      {loaded ? (
        children
      ) : (
        <div className="flex flex-col justify-center items-center h-screen text-2xl text-center">
          <p className="text-gray-800">
            Getting back up, the backend server spins down after 15 minutes of
            inactivity.
          </p>
          <p className="mt-6 text-gray-600">
            This may take a few seconds, even a minute :(
          </p>

          <svg
            class="mt-6 animate-spin -ml-1 mr-3 h-12 w-12 text-green-600 "
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24">
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      )}
    </AuthContext.Provider>
  );
}
