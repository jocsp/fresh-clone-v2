import { useEffect, useState } from "react";
import axios from "axios";
import { useAuthContext } from "./useAuthContext";

const useFetchData = (url, initialValue = null) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(initialValue);
  const [reFetchFlag, setReFetchFlag] = useState(false);
  const { dispatch } = useAuthContext();

  useEffect(() => {
    setLoaded(false);
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setData(response.data);
        setLoaded(true);
      } catch (err) {
        if (err.response.status === 401) {
          dispatch({ type: "LOGOUT" });
        }
        setError(err.response.data.error);
      }
    };

    fetchData();
  }, [url, reFetchFlag]);

  const reFetch = () => {
    setReFetchFlag((prevValue) => !prevValue);
  };

  return {
    data,
    loaded,
    error,
    reFetch,
  };
};

export default useFetchData;
