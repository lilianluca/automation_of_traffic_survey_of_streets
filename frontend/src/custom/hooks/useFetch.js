import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleFetchData = async (url) => {
      const response = await fetch(url);
      const data = await response.json();

      setData(data);
      setIsLoading(false);
    };

    handleFetchData(url);
  }, [url]);

  return { data, isLoading };
};

export default useFetch;
