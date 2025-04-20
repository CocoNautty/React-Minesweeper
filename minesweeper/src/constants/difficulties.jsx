/**
 * @file difficultyConstants.js
 * @description
 * - Contains predefined difficulty settings for the game.
 * - Each difficulty level defines the grid dimensions (width and height) and the number of mines.
 * - Includes a "Custom" difficulty for user-defined settings.
 */

/**
 * DIFFICULTIES constant object holds the difficulty levels for the game.
 *
 * - **EASY**: 9x9 grid with 10 mines.
 * - **MEDIUM**: 16x16 grid with 40 mines.
 * - **HARD**: 30x16 grid with 99 mines.
 * - **CUSTOM**: Custom difficulty where the user can set the grid dimensions and mine count.
 *
 * @constant
 * @type {Object}
 * @property {Object} EASY - Easy difficulty level with 9x9 grid and 10 mines.
 * @property {Object} MEDIUM - Medium difficulty level with 16x16 grid and 40 mines.
 * @property {Object} HARD - Hard difficulty level with 30x16 grid and 99 mines.
 * @property {Object} CUSTOM - Custom difficulty level with user-defined grid size and mine count.
 */

export const DIFFICULTIES = {
    EASY: {
      name: 'Easy',
      width: 9,
      height: 9,
      mines: 10
    },
    MEDIUM: {
      name: 'Medium',
      width: 16,
      height: 16,
      mines: 40
    },
    HARD: {
      name: 'Hard',
      width: 30,
      height: 16,
      mines: 99
    },
    CUSTOM: {
      name: 'Custom',
      width: 0,
      height: 0,
      mines: 0
    }
  };