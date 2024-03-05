import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import IntervalTraining from './IntervalTraining';
import ChordTraining from './ChordTraining';
import './App.css';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState(null);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log('Failed to log in', error)
  });

  useEffect(() => {
    if(user) {
      axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
        headers: {
            Authorization: `Bearer ${user.access_token}`,
            Accept: 'application/json'
        }
      }).then((res) => {
        setProfile(res.data);
      }).catch((error) => {
        console.log(error);
      })
    }
  }, [user]);

  const logOut = () => {
    googleLogout();
    setProfile(null);
  };

  return (
    <>
      {profile ? (
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/intervalTraining" element={<IntervalTraining profile={profile}/>} />
            <Route path="/chordTraining" element={<ChordTraining profile={profile}/>} />
          </Routes>
        </Router>
      ) : (
        <button onClick={login}>Log in through Google</button>
      )}
      
    </>
    
  );
}

export default App;
