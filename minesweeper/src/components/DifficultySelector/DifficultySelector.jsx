/**
 * @file DifficultySelector.jsx
 * @description
 * - Allows the user to select a difficulty level (Easy, Medium, Hard, or Custom).
 * - If 'Custom' is selected, a form appears to input custom width, height, and mine count.
 * - Validates and dispatches a new difficulty setting to the game context.
 */

import React, { useContext, useState } from 'react';
import GameContext from '../../context/GameContextObj';
import { DIFFICULTIES } from '../../constants/difficulties';

/**
 * DifficultySelector component provides difficulty selection options for the game.
 * 
 * - Offers preset options: Easy, Medium, Hard.
 * - Custom option allows users to input their own board size and mine count.
 * - Validates custom input to prevent invalid board configurations.
 *
 * @component
 * @returns {JSX.Element} The rendered difficulty selection UI.
 */

const DifficultySelector = () => {
    const { dispatch } = useContext(GameContext);
    const [showCustomForm, setShowCustomForm] = useState(false);
    const [customWidth, setCustomWidth] = useState(10);
    const [customHeight, setCustomHeight] = useState(10);
    const [customMines, setCustomMines] = useState(10);

    /**
     * Handles change in difficulty selection.
     * If 'CUSTOM' is selected, shows the custom input form.
     * Otherwise, dispatches the selected preset difficulty.
     * 
     * @param {string} difficulty - The selected difficulty level.
     */

    const handleDifficultyChange = (difficulty) => {
        if (difficulty === 'CUSTOM') {
            setShowCustomForm(true);
        } else {
            dispatch({
                type: 'SET_DIFFICULTY',
                payload: DIFFICULTIES[difficulty]
            });
            setShowCustomForm(false);
        }
    };

    /**
     * Handles submission of the custom difficulty form.
     * Ensures inputs are within valid ranges before dispatching.
     * 
     * @param {React.FormEvent} e - The form submission event.
     */
    
    const handleCustomSubmit = (e) => {
        e.preventDefault();

        // Validate inputs
        const width = Math.min(Math.max(5, customWidth), 40);
        const height = Math.min(Math.max(5, customHeight), 40);
        const maxMines = Math.floor(width * height * 0.8);
        const mines = Math.min(Math.max(1, customMines), maxMines);

        dispatch({
            type: 'SET_DIFFICULTY',
            payload: {
                name: 'Custom',
                width,
                height,
                mines
            }
        });

        setShowCustomForm(false);
    };

    return (
        <div className="DifficultySelector">
            <select onChange={(e) => handleDifficultyChange(e.target.value)}>
                <option value="EASY">Easy</option>
                <option value="MEDIUM">Medium</option>
                <option value="HARD">Hard</option>
                <option value="CUSTOM">Custom</option>
            </select>

            {showCustomForm && (
                <form className="CustomDifficulty" onSubmit={handleCustomSubmit}>
                    <div>
                        <label htmlFor="width">Width:</label>
                        <input
                            id="width"
                            type="number"
                            min="5"
                            max="40"
                            value={customWidth}
                            onChange={(e) => setCustomWidth(parseInt(e.target.value))}
                        />
                    </div>

                    <div>
                        <label htmlFor="height">Height:</label>
                        <input
                            id="height"
                            type="number"
                            min="5"
                            max="40"
                            value={customHeight}
                            onChange={(e) => setCustomHeight(parseInt(e.target.value))}
                        />
                    </div>

                    <div>
                        <label htmlFor="mines">Mines:</label>
                        <input
                            id="mines"
                            type="number"
                            min="1"
                            max={customWidth * customHeight - 1}
                            value={customMines}
                            onChange={(e) => setCustomMines(parseInt(e.target.value))}
                        />
                    </div>

                    <button type="submit">Apply</button>
                    <button type="button" onClick={() => setShowCustomForm(false)}>Cancel</button>
                </form>
            )}
        </div>
    );
};

export default DifficultySelector;
