/**
 * Reveals a cell and its neighbors recursively in the Minesweeper game.
 * The cell is revealed unless it is flagged or already revealed.
 * If the revealed cell has no neighboring mines (neighborMines === 0), its neighbors are also revealed recursively.
 *
 * @param {Array<Array<Object>>} board - The current game board (2D array), where each cell is an object with properties like `revealed`, `isMine`, `isFlagged`, and `neighborMines`.
 * @param {number} row - The row index of the cell to be revealed.
 * @param {number} col - The column index of the cell to be revealed.
 * @returns {Array<Array<Object>>} - A new 2D array representing the updated game board with the revealed cell(s).
 * 
 * @example
 * // Reveal a cell at position (2, 3) on a given board
 * const newBoard = revealCell(board, 2, 3);
 */

export const revealCell = (board, row, col) => {
  // Create a copy of the board only once, at the top level
  const newBoard = board.map(r => [...r]);

  // Use a helper function to modify the board in place
  const revealCellHelper = (r, c) => {
    // Check bounds
    if (r < 0 || r >= newBoard.length || c < 0 || c >= newBoard[0].length) {
      return;
    }

    const cell = newBoard[r][c];

    // Skip flagged or already revealed cells
    if (cell.isFlagged || cell.revealed) {
      return;
    }

    // Reveal this cell
    newBoard[r][c] = { ...cell, revealed: true };

    // If empty cell (no neighboring mines), recursively reveal neighbors
    if (cell.neighborMines === 0 && !cell.isMine) {
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          if (i === 0 && j === 0) continue;
          revealCellHelper(r + i, c + j);
        }
      }
    }
  };

  // Start the recursion
  revealCellHelper(row, col);

  return newBoard;
};
