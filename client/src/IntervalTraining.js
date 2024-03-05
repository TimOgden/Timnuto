import * as Tone from 'tone';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TwoColumns from './TwoColumns';
import axios from 'axios';

let currentInterval = null;
let baseNote = null;
let newNote = null;

function IntervalTraining({
    profile
}) {
    const [questionComplete, setQuestionComplete] = useState(false);
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

    const intervals = [
        [{key: 'blank', value: '--'}, {key: 'unison', value: 'Unison'}],
        [{key: 'minorSecond', value: 'Minor 2nd'}, {key: 'majorSecond', value: 'Major 2nd'}],
        [{key: 'minorThird', value: 'Minor 3rd'}, {key: 'majorThird', value: 'Major 3rd'}],
        [{key: 'blank', value: '--'}, {key: 'perfectFourth', value: 'Perfect 4th'}],
        [{key: 'tritone', value: 'Tritone'}, {key: 'perfectFifth', value: 'Perfect 5th'}],
        [{key: 'minorSixth', value: 'Minor 6th'}, {key: 'majorSixth', value: 'Major 6th'}],
        [{key: 'minorSeventh', value: 'Minor 7th'}, {key: 'majorSeventh', value: 'Major 7th'}],
        [{key: 'blank', value: '--'}, {key: 'octave', value: 'Octave'}]
    ];

    function randomNote() {
        const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
        const randomNote = notes[Math.floor(Math.random() * notes.length)];
        const randomOctave = Math.floor((Math.random() * (5 - 3 + 1)) + 3);
        baseNote = randomNote + randomOctave.toString();
        return baseNote;
    }

    function randomizeInterval(note) {
        // List of all notes in one octave for simplicity
        const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    
        // Extract interval values and pick a random one
        const intervalKeys = Object.keys(INTERVALS);
        const randomIntervalName = intervalKeys[Math.floor(Math.random() * intervalKeys.length)];
        currentInterval = randomIntervalName;
        const randomIntervalValue = INTERVALS[randomIntervalName];
        // Extract the base note and octave
        const baseNoteLetter = note.slice(0, -1); // Assumes the last character is the octave number
        const baseNoteOctave = parseInt(note.slice(-1), 10);
    
        // Find the index of the base note in the notes array
        const baseNoteIndex = notes.indexOf(baseNoteLetter);
    
        // Calculate the new note index by adding the interval
        let newNoteIndex = baseNoteIndex + randomIntervalValue;
    
        // Calculate the new octave and adjust the note index if necessary
        let newOctave = baseNoteOctave + Math.floor(newNoteIndex / notes.length);
        newNoteIndex = newNoteIndex % notes.length; // Ensure the note index wraps around the notes array
    
        // Construct the new note
        newNote = notes[newNoteIndex] + newOctave;
        return [baseNote, newNote, currentInterval];
    }
    
    function playInterval() {
        const synth = new Tone.Synth().toDestination();
        if (baseNote === null || newNote === null) {
            randomizeInterval(randomNote());
        }
        console.log(baseNote, newNote);
        console.log(currentInterval);
        const now = Tone.now();
        Tone.start();
        synth.triggerAttackRelease(baseNote, "8n", now);
        synth.triggerAttackRelease(newNote, "8n", now + 1);
    }
    
    function startQuestion() {
        setQuestionComplete(false);
        clearColors();
        randomizeInterval(randomNote());
        playInterval();
    }

    function clearColors() {
        const buttons = document.querySelectorAll('.guessButton');
        buttons.forEach((btn) => {
            btn.style.backgroundColor = '';
        });
    }

    function submitGuess(interval, event) {
        event.stopPropagation();
        if (questionComplete) return;
        event.target.style.backgroundColor = 'red';
        const isCorrect = interval === currentInterval;
        if (isCorrect) {
            event.target.style.backgroundColor = 'green';
            console.log('Correct!');
            setQuestionComplete(true);
        } else {
            console.log(`You guessed ${interval} but it was a ${currentInterval}`);
        }

        axios.post(`http://localhost:3001/guess`, {currentInterval, 
            interval, 
            isCorrect,
            datetime: Date.now()
        }, (res) => {

        }, (err) => {
            console.log(err);
        });
    }

    function revealAnswer(event) {
        event.stopPropagation();
        const buttons = document.querySelectorAll('.guessButton');
        buttons.forEach((btn) => {
            if(btn.getAttribute('data-interval') === currentInterval) {
                btn.style.backgroundColor = 'green';
            }
        })
        setQuestionComplete(true);
    }
    window.onload = playInterval;

    return (
    <div>
        <Link to='/'>Home</Link>
        <h1>Interval Training</h1>
        <div className="container" onClick={() => playInterval()}>
            <div className="intervalsGrid">
                <TwoColumns data={intervals} onClickHandler={submitGuess}/>
            </div>
        </div>
        <div className="buttons">
            
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