import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "../api/axios";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (username, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post("/api/user/login", {
        username,
        password,
      });

      setIsLoading(false);
      dispatch({ type: "LOGIN", payload: response.data });
    } catch (error) {
      console.log(error.response.data.error);
      setError(error.response.data.error);
      setIsLoading(false);
    }
  };

  return { login, error, isLoading };
};
