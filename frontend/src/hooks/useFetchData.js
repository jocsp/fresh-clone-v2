import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuthContext } from './useAuthContext';

const useFetchData = (url) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [reFetch, setReFetch] = useState(false);
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
          dispatch({ type: 'LOGOUT' });
        }
        setError(err.response.data.error);
      }
    };

    fetchData();
  }, [url, reFetch]);

  return {
    data,
    loaded,
    error,
    setReFetch,
  };
};

export default useFetchData;
