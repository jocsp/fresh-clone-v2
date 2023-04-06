import { useEffect, useState } from 'react';
import axios from 'axios';

const useFetchData = (url) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [reFetch, setReFetch] = useState(false);

  useEffect(() => {
    setLoaded(false);
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setData(response.data);
        setLoaded(true);
      } catch (err) {
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
