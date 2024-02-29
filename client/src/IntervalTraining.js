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
let baseNote = null;
let newNote = null;
let questionComplete = false;

function randomizeInterval() {
    // List of all notes in one octave for simplicity
    const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const randomNote = notes[Math.floor(Math.random() * notes.length)];
    const randomOctave = Math.floor(Math.random() * 2 + 3);
    baseNote = randomNote + randomOctave.toString();

    // Extract interval values and pick a random one
    const intervalKeys = Object.keys(INTERVALS);
    const randomIntervalName = intervalKeys[Math.floor(Math.random() * intervalKeys.length)];
    currentInterval = randomIntervalName;
    const randomIntervalValue = INTERVALS[randomIntervalName];
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
    newNote = notes[newNoteIndex] + newOctave;
    console.log(randomIntervalName);
    console.log(baseNote, newNote);
}

function playInterval() {
    const synth = new Tone.Synth().toDestination();
    if (baseNote === null || newNote === null) {
        randomizeInterval();
    }
    const now = Tone.now();
    Tone.start();
    synth.triggerAttackRelease(baseNote, "8n", now);
    synth.triggerAttackRelease(newNote, "8n", now + 1);
}

function startQuestion() {
    questionComplete = false;
    clearColors();
    randomizeInterval();
    playInterval();
}

function restartOrPlay() {
    if (questionComplete) {
        startQuestion();
    } else {
        playInterval();
    }
}

function clearColors() {
    const buttons = document.querySelectorAll('.guessButton');
    buttons.forEach((btn) => {
        btn.style.backgroundColor = '';
    });
}

function submitGuess(interval, event) {
    event.stopPropagation();
    event.target.style.backgroundColor = 'red';
    if (interval === currentInterval) {
        event.target.style.backgroundColor = 'green';
        console.log('Correct!');
        questionComplete = true;
    } else {
        console.log(`You guessed ${interval} but it was a ${currentInterval}`);
    }
}

function revealAnswer(event) {
    event.stopPropagation();
    const buttons = document.querySelectorAll('.guessButton');
    buttons.forEach((btn) => {
        if(btn.getAttribute('data-interval') === currentInterval) {
            btn.style.backgroundColor = 'green';
        }
    })
    questionComplete = true;
}


function IntervalTraining() {
    window.onload = restartOrPlay;
    return (
    <div>
        <h1>Interval Training</h1>
        <div class="container" onClick={() => playInterval()}>
            <ul>
                {Object.keys(INTERVALS).map((interval) => (
                    <li key={interval}>
                        <button key={interval}
                            class='guessButton'
                            data-interval={interval}
                            onClick={(event) => submitGuess(interval, event)}>
                                {interval.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
        <div class="buttons">
            
            {questionComplete ? (
                <button onClick={() => startQuestion()}>Next Question</button>
            ) : (
                <div>
                    <button onClick={(event) => revealAnswer(event)}>Reveal Answer</button>
                    <button onClick={() => startQuestion()}>Skip Question</button>
                </div>
            )}
        </div>
    </div>
    )
}

export default IntervalTraining;