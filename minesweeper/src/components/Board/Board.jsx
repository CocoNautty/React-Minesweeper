/**
 * @file Board.jsx
 * @description
 * - Renders the game grid.
 * - Manages the rendering of individual tiles.
 * - Handles grid sizing based on difficulty level.
 */

import React, { useContext } from 'react';
import Tile from '../Tile/Tile';
import GameContext from '../../context/GameContextObj';
import './Board.css';

/**
 * Board component that displays the main game grid.
 * 
 * - Dynamically adjusts grid dimensions based on current difficulty settings.
 * - Iterates through the `board` state and renders a `Tile` for each cell.
 * 
 * @component
 * @returns {JSX.Element} A styled grid of `Tile` components representing the game board.
 */

const Board = () => {
  const { state } = useContext(GameContext);
  const { board, difficulty } = state;

  // Calculate grid style based on difficulty
  const gridStyle = {
    gridTemplateColumns: `repeat(${difficulty.width}, 30px)`,
    gridTemplateRows: `repeat(${difficulty.height}, 30px)`,
  };

  return (
    <div className="board-container">
      <div className="board" style={gridStyle}>
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <Tile
              key={`${rowIndex}-${colIndex}`}
              cell={cell}
              row={rowIndex}
              col={colIndex}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Board;
