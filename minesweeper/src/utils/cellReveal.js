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
