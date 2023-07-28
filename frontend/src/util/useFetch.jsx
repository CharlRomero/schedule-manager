import { useState, useEffect } from "react";

export const useFetch = (URL) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(URL);
        const responseData = await response.json();
        setData(responseData);
      } catch (error) {
        console.log("Error: ", error);
      }
    };

    fetchData();
  }, [URL]);

  return data;
};
