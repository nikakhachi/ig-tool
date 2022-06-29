import {
  CircularProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from '@mui/material';
import { CheckCircle, DoNotDisturb, ExpandMore } from '@mui/icons-material';
import { useContext } from 'react';
import { useAbstractProvider } from '../../hooks/useAbstractProvider';
import { FollowingsByDays } from '../../types/followingsByDays';
import styles from './styles.module.css';
import { UserContext } from '../../contexts/UserContext';
import { DataApi } from '../../api/data';

function Home() {
  const userContext = useContext(UserContext);

  const followingsByDaysProvider = useAbstractProvider(DataApi.getConnectionsByDays);

  const user = userContext?.user;

  return followingsByDaysProvider.loading ? (
    <CircularProgress />
  ) : (
    <div className={styles.container}>
      {JSON.stringify(followingsByDaysProvider.data, null, 4)}
      {/* <div className={styles.userInfoDiv}>
        <Typography color="red" variant="h4">
          {user?.username}
        </Typography>
        <Typography color="red" variant="h6">
          Followers last updated time : {followingsByDaysProvider.data.followersLastUpdatedTime}
        </Typography>
      </div>
      <div className={styles.accordionContainer}>
        {followingsByDaysProvider.data.followingsByDays.map((data: FollowingsByDays) => {
          const followingCount = data.followings.length;
          const followBackCount = data.followings.filter((following) => following.followsBack).length;
          const followBackPercentage = Math.round((followBackCount / followingCount) * 100);
          return (
            <Accordion>
              <AccordionSummary
                sx={{
                  backgroundColor: 'rgb(50,50,50)',
                  color: 'white',
                }}
                className={styles.accordionSummary}
                expandIcon={
                  <span style={{ color: 'red' }}>
                    <ExpandMore color="inherit" />
                  </span>
                }
              >
                <Typography className={styles.accordionTitle}>
                  {data.time} : Followed
                  {followingCount} |{followBackCount} Followed Back | Ratio
                  {followBackPercentage}%
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List className={styles.accordionList} dense>
                  {data.followings.map((following) => (
                    <ListItem>
                      <ListItemIcon>{following.followsBack ? <CheckCircle /> : <DoNotDisturb />} </ListItemIcon>
                      <ListItemText primary={following.username} secondary={following.fullName} />
                    </ListItem>
                  ))}
                </List>
              </AccordionDetails>
            </Accordion>
          );
        })}
      </div> */}
    </div>
  );
}

export { Home };
