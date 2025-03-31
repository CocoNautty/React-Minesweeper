export const flagCell = (board, row, col) => {
    // Create a copy of the board only once, at the top level
    const newBoard = board.map(r => [...r]);

    // Use a helper function to modify the board in place
    const flagCellHelper = (r, c) => {
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
        newBoard[r][c] = { ...cell, isFlagged: true };

    };

    // Start the recursion
    flagCellHelper(row, col);

    return newBoard;
};
