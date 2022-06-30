import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { UserProvider } from './contexts/UserContext';
import { SignIn } from './pages/Auth';
import { Home } from './pages/Home';
import { PrivateRoute } from './routes/PrivateRoute';
import { UserConnectionType } from 'serverTypes/main.types';

function App() {
  useEffect(() => {
    let connection: UserConnectionType = {
      pk: 7126713,
      username: 'string',
      full_name: 'string',
      profile_pic_url: 'string',
      connectionTypeId: undefined,
    };
    console.log(connection, 'test');
  }, []);
  return (
    <div className="App">
      <UserProvider>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route element={<Home />} path="/" />
          </Route>
          <Route path="/sign-in" element={<SignIn />} />
        </Routes>
      </UserProvider>
    </div>
  );
}

export default App;
