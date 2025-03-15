// Renders the game grid

// Manages the rendering of individual tiles

// Handles grid sizing based on difficulty
import React, { useContext } from 'react';
import Tile from '../Tile/Tile';
import { GameContext } from '../../context/GameContext';
// import './Board.css';

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
