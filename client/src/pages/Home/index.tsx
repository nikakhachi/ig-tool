import { CircularProgress } from '@mui/material';
import { useContext } from 'react';
import styles from './styles.module.css';
import { UserContext } from '../../contexts/UserContext';
import { useConnectionsByDaysProvider } from '../../hooks/useConnectionsByDaysProvider';

function Home() {
  const userContext = useContext(UserContext);
  const user = userContext?.user;

  const connectionsByDaysProvider = useConnectionsByDaysProvider();

  return connectionsByDaysProvider.loading ? (
    <CircularProgress />
  ) : (
    <div className={styles.container}>
      <h2>{user?.username}</h2>
      <pre>{JSON.stringify(connectionsByDaysProvider.data, null, 2)}</pre>
    </div>
  );
}

export { Home };
