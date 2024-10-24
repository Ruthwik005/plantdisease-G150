
import SignUp from './Components/SignUp.jsx';
import LogIn from './Components/LogIn.jsx';
import Error from './Components/Error.jsx';
import Home from './Components/Home.jsx';
import Profile from './Components/Profile.js';
import useAuth from './hooks/useAuth.js';
import {Navigate , Routes , Route } from 'react-router-dom';

function App() {
  useAuth();
  return (
      <div>
        <Routes>
        <Route path="/" element = {<Navigate to="/home"/>} />
          <Route path="/login" element = {<LogIn/>} /> 
          <Route path="/signup" element = {<SignUp/>} /> 
          <Route path="/home" element = {<Home/>} /> 
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </div>
  );
}

export default App;
