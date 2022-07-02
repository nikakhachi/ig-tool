import { CircularProgress } from '@mui/material';
import { useContext } from 'react';
import styles from './styles.module.css';
import { UserContext } from '../../contexts/UserContext';
import { useConnectionsByDaysProvider } from '../../hooks/useConnectionsByDaysProvider';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function Home() {
  const userContext = useContext(UserContext);
  const user = userContext?.user;

  const connectionsByDaysProvider = useConnectionsByDaysProvider();

  return connectionsByDaysProvider.loading ? (
    <CircularProgress />
  ) : (
    <div className={styles.container}>
      <h2>{user?.username}</h2>
      {Object.keys(connectionsByDaysProvider.data).map((date) => (
        <Accordion sx={{ width: 750 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
            <Typography>{date}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {Object.keys(connectionsByDaysProvider.data[date]).map((connectionType) => {
              // eslint-disable-next-line
              // @ts-ignore
              const connections = connectionsByDaysProvider.data[date][connectionType];
              return (
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                    <Typography>
                      {connectionType} {connections.length}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ height: 200, overflowY: 'scroll' }}>
                    <pre>{JSON.stringify(connections, null, 2)}</pre>
                  </AccordionDetails>
                </Accordion>
              );
            })}
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}

export { Home };
