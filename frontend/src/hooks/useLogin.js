import { useState } from "react";
import axios from "axios";
import { useAuthContext } from "./useAuthContext";

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

      console.log("this is the response when loging in", response);

      console.log("this is the data when loging in", response.data);
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
