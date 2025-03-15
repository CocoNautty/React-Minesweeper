// Recursively reveal cells
export const revealCell = (board, row, col) => {
    if (row < 0 || row >= board.length || col < 0 || col >= board[0].length) {
      return board; // Out of bounds
    }

    const cell = board[row][col];

    // Don't reveal flagged cells or already revealed cells
    if (cell.isFlagged || cell.revealed) {
      return board;
    }

    // Create a new board with the current cell revealed
    const newBoard = board.map(r => [...r]);
    newBoard[row][col] = { ...cell, revealed: true };

    // If the cell has no neighboring mines, reveal its neighbors
    if (cell.neighborMines === 0 && !cell.isMine) {
      // Reveal all 8 neighboring cells recursively
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          if (i === 0 && j === 0) continue;

          revealCell(newBoard, row + i, col + j);
        }
      }
    }

    return newBoard;
  };
