// Generate the game board with mines and neighbor counts
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
