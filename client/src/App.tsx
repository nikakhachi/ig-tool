import { Route, Routes } from 'react-router-dom';
import './App.css';
import { UserProvider } from './contexts/UserContext';
import { SignIn } from './pages/Auth';
import { Home } from './pages/Home';
import { PrivateRoute } from './routes/PrivateRoute';

function App() {
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
