import { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { ServerResponseType } from '../api';

export const useAbstractProvider = (fetchFunction: () => Promise<ServerResponseType>, autoFetch = true) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(); // eslint-disable-line @typescript-eslint/no-explicit-any
  const [error, setError] = useState<any>(); // eslint-disable-line @typescript-eslint/no-explicit-any

  const fetch = async () => {
    setLoading(true);
    try {
      const response = await fetchFunction();
      setData(response.data || response.message);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (autoFetch) {
      fetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refetch = () => {
    fetch();
  };

  return {
    data,
    refetch,
    loading,
    error,
  };
};
