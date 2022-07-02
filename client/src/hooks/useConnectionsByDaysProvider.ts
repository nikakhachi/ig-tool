import { useEffect, useState } from 'react';
import { GetConnectionsByDaysControllerResponseType } from 'serverTypes/controllerResponse.types';
import { api } from '../api';

type ApiResponseType = {
  data: GetConnectionsByDaysControllerResponseType;
  path: string;
  status: number;
};

type ApiResponseErrorType = {
  message: string;
  path: string;
  status: number;
};

export const useConnectionsByDaysProvider = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<GetConnectionsByDaysControllerResponseType>({});
  const [error, setError] = useState<ApiResponseErrorType | undefined>();

  const fetch = async () => {
    setLoading(true);
    try {
      const response = (await api.get('/v1/user/connections-by-days')) as ApiResponseType;
      setData(response.data);
    } catch (e) {
      setError(e as ApiResponseErrorType);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
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
