/**
 * @file Timer.jsx
 * @description
 * - Displays the game timer.
 * - Starts and stops the timer based on the game status.
 * - Increments the timer when the game is being played.
 */

import { formatTime } from "../../utils/formatTime";
import React, { useContext, useEffect } from 'react';
import GameContext from '../../context/GameContextObj';
import './Timer.css';

/**
 * Timer component displays the elapsed game time.
 *
 * - Starts the timer when the game is in progress and `isTimerRunning` is true.
 * - Stops the timer when the game is not in progress or the game status changes.
 * - Displays the formatted elapsed time in minutes and seconds.
 *
 * @component
 * @returns {JSX.Element} The rendered timer showing the formatted time.
 */

const Timer = () => {
    const { state, dispatch } = useContext(GameContext);
    const { timer, isTimerRunning, gameStatus } = state;

    /**
     * Starts or stops the timer based on game status and timer state.
     * Uses a side effect to update the timer value every 10ms when the game is being played.
     * Cleans up the interval on component unmount or status change.
     */
    
    useEffect(() => {
        let interval;
        if (isTimerRunning && gameStatus === 'playing') {
            interval = setInterval(() => {
                dispatch({ type: 'INCREMENT_TIMER' });
            }, 10);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isTimerRunning, gameStatus, dispatch]);
    return (
        <div className="timer">
            <span role="img" aria-label="Timer"></span>
            <span>{formatTime(timer)}</span>
        </div>
    );
};
export default Timer;