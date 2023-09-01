import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";

const useRequest = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [finished, setFinished] = useState(null);
  const [error, setError] = useState(null);

  const { dispatch } = useAuthContext();

  const sendRequest = async ({ url, method, data, params }) => {
    setError(null);
    setLoading(true);

    try {
      const response = await axios({
        url: url,
        method: method,
        data: data,
        params: params,
      });

      setData(response.data);
      setLoading(false);
      setFinished(true);

      return response;
    } catch (err) {
      console.log(err);
      if (err.response.status === 401) {
        dispatch({ type: "LOGOUT" });
      }
      setError(err.response.data.error);
    }
  };

  return { data, error, loading, finished, sendRequest, setError };
};

export default useRequest;
