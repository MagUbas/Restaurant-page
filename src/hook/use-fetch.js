import { useState, useCallback } from "react";

const useFetch = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const sendRequest = useCallback(async (requestConfig, funct, functError) => {
    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : "GET",
        headers: requestConfig.headers
          ? requestConfig.headers
          : { "Content-Type": "application/json" },
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
      });
      const data = await response.json();
      if (!response.ok) {
        functError(data);
        throw new Error("Network response was not OK");
      } else {
        funct(data);
      }
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, []);

  return {
    sendRequest,
    error,
    isLoading,
  };
};

export default useFetch;
