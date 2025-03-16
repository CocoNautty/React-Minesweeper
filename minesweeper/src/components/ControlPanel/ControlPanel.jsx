// Contains game controls (restart, new game)

// Houses difficulty selector and timer

// Displays mine counter (flags remaining)
import React, { useContext } from 'react';
import GameContext from '../../context/GameContextObj';
import DifficultySelector from '../DifficultySelector/DifficultySelector';
import Timer from '../Timer/Timer';
import './ControlPanel.css'

const ControlPanel = () => {
    const { state, dispatch } = useContext(GameContext);
    const { difficulty, flagsPlaced, gameStatus } = state;

    const handleNewGame = () => {
        dispatch({ type: 'NEW_GAME' });
    };

    const handleRestart = () => {
        dispatch({ type: 'RESTART_GAME' });
    };

    // Calculate remaining mines
    const remainingMines = difficulty.mines - flagsPlaced;

    return (
        <div className="controlPanel">
            <Timer />
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
    );
};

export default ControlPanel;
