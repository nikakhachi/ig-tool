import { useState, useEffect, useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import { api } from '../api';
import { UserContext } from '../contexts/UserContext';
import { AuthApi } from '../api/auth';

function PrivateRoute() {
  const userContext = useContext(UserContext);

  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const response = await AuthApi.validateUser();
        userContext?.setUser(response.data);
        setIsAuthorized(true);
      } catch (error) {
        setIsAuthorized(false);
      } finally {
        setIsLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isLoading ? <CircularProgress /> : isAuthorized ? <Outlet /> : <Navigate to="sign-in" />;
}

export { PrivateRoute };
