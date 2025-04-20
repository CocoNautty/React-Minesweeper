/**
 * Flags a cell in the Minesweeper game.
 * The cell is flagged unless it is already flagged or revealed.
 *
 * @param {Array<Array<Object>>} board - The current game board (2D array), where each cell is an object with properties like `revealed`, `isMine`, `isFlagged`, and `neighborMines`.
 * @param {number} row - The row index of the cell to be flagged.
 * @param {number} col - The column index of the cell to be flagged.
 * @returns {Array<Array<Object>>} - A new 2D array representing the updated game board with the flagged cell.
 * 
 * @example
 * // Flag a cell at position (2, 3) on a given board
 * const newBoard = flagCell(board, 2, 3);
 */

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
