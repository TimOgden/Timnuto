import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import HomePage from './HomePage';
import IntervalTraining from './IntervalTraining';
import ChordTraining from './ChordTraining';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/intervalTraining" element={<IntervalTraining />} />
        <Route path="/chordTraining" element={<ChordTraining />} />
      </Routes>
    </Router>
  );
}

export default App;
