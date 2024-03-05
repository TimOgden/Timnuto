import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import IntervalTraining from './IntervalTraining';
import ChordTraining from './ChordTraining';
import './App.css';
import { GoogleLogin } from '@react-oauth/google';

function App() {
  const responseMessage = (response) => {
    console.log(response);
  };
  const errorMessage = (error) => {
    console.log(error);
  };

  return (
    <>
      <GoogleLogin onSuccess={responseMessage} onError={errorMessage}/>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/intervalTraining" element={<IntervalTraining />} />
          <Route path="/chordTraining" element={<ChordTraining />} />
        </Routes>
      </Router>
    </>
    
  );
}

export default App;
