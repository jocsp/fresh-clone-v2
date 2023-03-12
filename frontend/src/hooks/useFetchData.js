import { useEffect, useState } from "react";

import axios from "../api/axios";

const useFetchData = ({ url }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/ticket/get-tickets");
        setData(response.data);
        setLoaded(true);
      } catch (error) {
        console.log(error);
        setError(error);
      }
    };

    fetchData();
  }, [url]);

  return { data, loaded, error };
};

export default useFetchData;
