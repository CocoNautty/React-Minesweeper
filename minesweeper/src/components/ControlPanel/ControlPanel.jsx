/**
 * @file ControlPanel.jsx
 * @description
 * - Contains game controls (restart, new game).
 * - Houses the difficulty selector and game timer.
 * - Displays mine counter (flags remaining).
 */

import React, { useContext } from 'react';
import GameContext from '../../context/GameContextObj';
import DifficultySelector from '../DifficultySelector/DifficultySelector';
import Timer from '../Timer/Timer';
import './ControlPanel.css'

/**
 * ControlPanel component provides user controls for the game.
 *
 * - Displays a timer using the Timer component.
 * - Shows the number of remaining mines (total mines - flags placed).
 * - Includes buttons to restart the current game or start a new one.
 * - Contains the DifficultySelector for choosing game difficulty.
 *
 * @component
 * @returns {JSX.Element} The rendered control panel with game management options.
 */

const ControlPanel = () => {
    const { state, dispatch } = useContext(GameContext);
    const { difficulty, flagsPlaced, gameStatus } = state;
    /**
     * Dispatches an action to start a new game.
     */
    const handleNewGame = () => {
        dispatch({ type: 'NEW_GAME' });
    };

    /**
     * Dispatches an action to restart the current game.
     */
    const handleRestart = () => {
        dispatch({ type: 'RESTART_GAME' });
    };

    // Calculate remaining mines
    const remainingMines = difficulty.mines - flagsPlaced;

    return (
        <>
            <Timer />

            <div className="controlPanel">
                <div className="MineCounter">
                    <span role="img" aria-label="Mine">💣</span>
                    <span>{remainingMines}</span>
                </div>

                <div className="Restart">
                    <button onClick={handleRestart} title="Restart Game">
                        {gameStatus === 'lost' ? '😵' : gameStatus === 'won' ? '😎' : '🙂'}
                    </button>
                </div>
                <div className='NewGame'>
                    <button onClick={handleNewGame}>New Game</button>
                </div>
                <DifficultySelector />
            </div>
        </>
    );
};

export default ControlPanel;
