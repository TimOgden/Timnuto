import { Link } from 'react-router-dom';

function HomePage() {
    return (
    <div className="App">
      <ul>
        <li>
          <Link to='/intervalTraining'>Interval Training</Link>
        </li>
        <li>
          <Link to='/chordTraining'>Chord Training</Link>
        </li>
      </ul>
    </div>
    )
}

export default HomePage;