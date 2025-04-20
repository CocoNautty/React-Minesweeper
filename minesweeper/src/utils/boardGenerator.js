/**
 * Generates a game board for Minesweeper with mines and neighbor mine counts.
 *
 * @param {number} width - The width of the game board (number of columns).
 * @param {number} height - The height of the game board (number of rows).
 * @param {number} mineCount - The number of mines to place on the board.
 * @returns {Array<Array<Object>>} - A 2D array representing the game board where each cell contains an object with the following properties:
 *   - `revealed` (boolean): Indicates if the cell has been revealed.
 *   - `isMine` (boolean): Indicates if the cell contains a mine.
 *   - `isFlagged` (boolean): Indicates if the cell has been flagged as a mine.
 *   - `neighborMines` (number): The number of mines in the neighboring cells.
 */

export const generateBoard = (width, height, mineCount) => {
    // Create empty board
    const board = Array(height).fill().map(() =>
      Array(width).fill().map(() => ({
        revealed: false,
        isMine: false,
        isFlagged: false,
        neighborMines: 0
      }))
    );

    // Place mines randomly
    let minesPlaced = 0;
    while (minesPlaced < mineCount) {
      const x = Math.floor(Math.random() * width);
      const y = Math.floor(Math.random() * height);

      if (!board[y][x].isMine) {
        board[y][x].isMine = true;
        minesPlaced++;

        // Update neighbor counts
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) continue;

            const newY = y + i;
            const newX = x + j;

            if (newY >= 0 && newY < height && newX >= 0 && newX < width) {
              board[newY][newX].neighborMines++;
            }
          }
        }
      }
    }

    return board;
  };
