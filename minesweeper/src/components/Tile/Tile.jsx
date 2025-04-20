/**
 * @file Tile.jsx
 * @description
 * - Represents an individual cell in the Minesweeper grid.
 * - Handles left and right-click events for revealing cells and toggling flags.
 * - Renders different visual states based on the cell's status (hidden, revealed, flagged, mine).
 */

import React, { useContext } from 'react';
import GameContext from '../../context/GameContextObj';
import './Tile.css';

/**
 * Tile component displays a single cell in the Minesweeper game grid.
 *
 * - Handles left-click to reveal the cell and right-click to toggle flag.
 * - Displays a mine, a flag, or the number of neighboring mines, depending on the cell's state.
 * - Supports multiple visual states: hidden, revealed, flagged, or containing a mine.
 *
 * @component
 * @param {Object} props - The properties passed to the component.
 * @param {Object} props.cell - The state of the current cell (revealed, flagged, mine, etc.).
 * @param {number} props.row - The row index of the cell in the grid.
 * @param {number} props.col - The column index of the cell in the grid.
 * @returns {JSX.Element} The rendered tile (cell) with appropriate state and display.
 */

const Tile = ({ cell, row, col }) => {
  const { dispatch } = useContext(GameContext);

  /**
   * Handles left-click events to reveal the cell.
   * Prevents action if the cell is already revealed or flagged.
   * Dispatches an action to reveal the cell.
   *
   * @param {MouseEvent} e - The event object for the left-click.
   */

  const handleLeftClick = (e) => {
    e.preventDefault();
    if (cell.revealed || cell.isFlagged) return;

    dispatch({
      type: 'REVEAL_CELL',
      payload: { row, col }
    });
  };

  /**
   * Handles right-click events to toggle flag on the cell.
   * Prevents action if the cell is already revealed.
   * Dispatches an action to toggle the flag state of the cell.
   *
   * @param {MouseEvent} e - The event object for the right-click.
   */

  const handleRightClick = (e) => {
    e.preventDefault();
    if (cell.revealed) return;

    dispatch({
      type: 'TOGGLE_FLAG',
      payload: { row, col }
    });
  };

  /**
   * Determines the class name for the cell based on its state.
   * @returns {string} The class name for the cell's current visual state.
   */

  const getCellClass = () => {
    if (!cell.revealed) {
      return cell.isFlagged ? 'tile flagged' : 'tile hidden';
    }

    if (cell.isMine) {
      return 'tile revealed mine';
    }

    return `tile revealed neighbor-${cell.neighborMines}`;
  };

  /**
   * Determines the content to display inside the cell.
   * Shows a flag, a mine, or the number of neighboring mines.
   * @returns {string|number} The content to display within the tile.
   */  
  
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
