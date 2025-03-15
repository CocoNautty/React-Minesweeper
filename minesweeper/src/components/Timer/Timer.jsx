import { formatTime } from "../../utils/formatTime";
import React, { useContext, useEffect } from 'react';
import { GameContext } from '../../context/GameContext';
// import './Timer.css';
const Timer = () => {
    const { state, dispatch } = useContext(GameContext);
    const { timer, isTimerRunning, gameStatus } = state;
    // Start/stop timer based on game status
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