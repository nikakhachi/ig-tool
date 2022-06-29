import { TextField, Button } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../api';
import { AuthApi } from '../../api/auth';
import styles from './styles.module.css';

function SignIn() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setPassword(e.target.value);
  };

  const handleSignIn = async () => {
    await AuthApi.signIn(username, password);
    navigate('/');
  };

  return (
    <div className={styles.container}>
      <div className={styles.formBox}>
        <h3>IG Follow/Unfollow Helper Tool</h3>
        <TextField label="Username" size="small" value={username} onChange={handleUsernameChange} />
        <TextField label="Password" size="small" value={password} onChange={handlePasswordChange} type="password" />
        <div className={styles.buttonDiv}>
          <Button variant="outlined" onClick={handleSignIn}>
            Sign In
          </Button>
        </div>
      </div>
    </div>
  );
}

export { SignIn };
