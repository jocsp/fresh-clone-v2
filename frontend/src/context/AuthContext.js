import { createContext, useReducer, useEffect, useState } from "react";
import Loading from "../components/Loading";
import axios from "axios";
import { differenceInMinutes } from "date-fns";

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
  const [isServerDown, setIsServerDown] = useState(false);

  useEffect(() => {
    const authorize = async () => {
      const response = await axios.post("api/user/initial-auth");

      if (response.data.authorized) {
        dispatch({ type: "LOGIN", payload: response.data.agent });
      }

      setLoaded(true);

      const currentDate = new Date();

      localStorage.setItem("lastTimeAccessed", currentDate.toISOString());
    };

    const lastUsed = localStorage.getItem("lastTimeAccessed");

    if (lastUsed) {
      const minutesPassed = differenceInMinutes(new Date(), new Date(lastUsed));

      if (minutesPassed >= 15) {
        setIsServerDown(true);
      }
    }

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
      {loaded ? children : <Loading />}

      {/* render.com spins down the backend server after 15 minutes of inactivity, to avoid this, upgrade membership or change of platforms */}

      {!loaded && isServerDown ? (
        <div className="text-center mt-10">
          <p className="text-gray-800">
            Getting back up, the backend server spins down after 15 minutes of
            inactivity.
          </p>
          <p className="mt-6 text-gray-600">
            This may take a few seconds, even a minute :(
          </p>
        </div>
      ) : null}
    </AuthContext.Provider>
  );
}
