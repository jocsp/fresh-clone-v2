import { createContext, useReducer, useEffect, useState } from "react";
import axios from "../api/axios";

export const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { agent: action.payload };
    case "LOGOUT":
      return { agent: null };
    case "UPDT-TKTS-ASSGND":
      state.agent.ticketsAssigned.push(action.payload);
      return { ...state };
    case "ADD-TODO":
      state.agent.todos.push(action.payload);
      return { ...state };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
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

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {loaded && children}
    </AuthContext.Provider>
  );
};
