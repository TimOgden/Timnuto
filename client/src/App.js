import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import IntervalTraining from './IntervalTraining';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/intervalTraining" element={<IntervalTraining />} />
      </Routes>
    </Router>
  );
}

export default App;
