import * as Tone from 'tone';


const INTERVALS = {
    unison: 0,
    minorSecond: 1,
    majorSecond: 2,
    minorThird: 3,
    majorThird: 4,
    perfectFourth: 5,
    tritone: 6,
    perfectFifth: 7,
    minorSixth: 8,
    majorSixth: 9,
    minorSeventh: 10,
    majorSeventh: 11,
    octave: 12
};

let currentInterval = null;

function randomInterval() {
    // List of all notes in one octave for simplicity
    const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const randomNote = notes[Math.floor(Math.random() * notes.length)];
    const randomOctave = Math.floor(Math.random() * 2 + 3);
    const baseNote = randomNote + randomOctave.toString();
    console.log(baseNote);

    // Extract interval values and pick a random one
    const intervalKeys = Object.keys(INTERVALS);
    let randomIntervalValue = intervalKeys[Math.floor(Math.random() * intervalKeys.length)];
    currentInterval = randomIntervalValue;
    randomIntervalValue = INTERVALS[randomIntervalValue];
    // Extract the base note and octave
    const baseNoteLetter = baseNote.slice(0, -1); // Assumes the last character is the octave number
    const baseNoteOctave = parseInt(baseNote.slice(-1), 10);

    // Find the index of the base note in the notes array
    const baseNoteIndex = notes.indexOf(baseNoteLetter);

    // Calculate the new note index by adding the interval
    let newNoteIndex = baseNoteIndex + randomIntervalValue;

    // Calculate the new octave and adjust the note index if necessary
    let newOctave = baseNoteOctave + Math.floor(newNoteIndex / notes.length);
    newNoteIndex = newNoteIndex % notes.length; // Ensure the note index wraps around the notes array

    // Construct the new note
    const newNote = notes[newNoteIndex] + newOctave;

    return { baseNote, newNote };
}

function playRandomInterval(synth) {
    const now = Tone.now();
    const { baseNote, newNote } = randomInterval();
    synth.triggerAttackRelease(baseNote, "8n", now);
    synth.triggerAttackRelease(newNote, "8n", now + 1);
}

function submitGuess(interval) {
    if (interval === currentInterval) {
        console.log('Correct!');
    } else {
        console.log(`You guessed ${interval} but it was a ${currentInterval}`);
    }
}


function IntervalTraining() {
    const synth = new Tone.Synth().toDestination();
      
    return (
    <div>
        <h1>Interval Training</h1>
        <div class="container" onClick={() => playRandomInterval(synth)}>
            <ul>
                {Object.keys(INTERVALS).map((interval) => (
                    <li>
                        <button key={interval}
                            onClick={() => submitGuess(interval)}>
                                {interval.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    </div>
    )
}

export default IntervalTraining;