// Individual cell in the grid

// Handles click events (left-click to reveal, right-click to flag)

// Different visual states (hidden, revealed, flagged, mine)
import React, { useContext } from 'react';
import GameContext from '../../context/GameContextObj';
import './Tile.css';

const Tile = ({ cell, row, col }) => {
  const { dispatch } = useContext(GameContext);

  const handleLeftClick = (e) => {
    e.preventDefault();
    if (cell.revealed || cell.isFlagged) return;

    dispatch({
      type: 'REVEAL_CELL',
      payload: { row, col }
    });
  };

  const handleRightClick = (e) => {
    e.preventDefault();
    if (cell.revealed) return;

    dispatch({
      type: 'TOGGLE_FLAG',
      payload: { row, col }
    });
  };

  // Determine cell class based on its state
  const getCellClass = () => {
    if (!cell.revealed) {
      return cell.isFlagged ? 'tile flagged' : 'tile hidden';
    }

    if (cell.isMine) {
      return 'tile revealed mine';
    }

    return `tile revealed neighbor-${cell.neighborMines}`;
  };

  // Determine what to display in the cell
  const getDisplay = () => {
    if (!cell.revealed) {
      return cell.isFlagged ? '🚩' : '';
    }

    if (cell.isMine) {
      return '💣';
    }

    return cell.neighborMines > 0 ? cell.neighborMines : '';
  };

  return (
    <div
      className={getCellClass()}
      onClick={handleLeftClick}
      onContextMenu={handleRightClick}
    >
      {getDisplay()}
    </div>
  );
};

export default Tile;
