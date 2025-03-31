// Manages the game state across components
import React, { useReducer, useEffect } from 'react';
import { DIFFICULTIES } from '../constants/difficulties';
import { generateBoard } from '../utils/boardGenerator';
import { revealCell } from '../utils/cellReveal';
import GameContext from './GameContextObj';

// Initial game state
const initialState = {
  board: [],
  difficulty: DIFFICULTIES.EASY,
  gameStatus: 'idle', // 'idle', 'playing', 'won', 'lost'
  flagsPlaced: 0,
  timer: 0,
  isTimerRunning: false,
  firstClick: true, // To ensure first click is never a mine
};

// Game reducer with all possible actions
const gameReducer = (state, action) => {
  switch (action.type) {
    case 'NEW_GAME':
      return {
        ...initialState,
        difficulty: state.difficulty,
        board: []
      };

    case 'START_GAME':
      return {
        ...state,
        board: generateBoard(state.difficulty.width, state.difficulty.height, state.difficulty.mines),
        gameStatus: 'playing',
        flagsPlaced: 0,
        timer: 0,
        isTimerRunning: false,
        firstClick: true
      };

    case 'PLAYING_GAME':
      return{
        ...state,
        isTimerRunning: true
      }
    case 'RESTART_GAME':
      return {
        ...state,
        board: generateBoard(state.difficulty.width, state.difficulty.height, state.difficulty.mines),
        gameStatus: 'playing',
        flagsPlaced: 0,
        timer: 0,
        isTimerRunning: false,
        firstClick: true
      };

    case 'SET_DIFFICULTY':
      return {
        ...state,
        difficulty: action.payload,
        gameStatus: 'idle'
      };

    case 'REVEAL_CELL':
      const { row, col } = action.payload;
      let updatedBoard = [...state.board];
      const cell = updatedBoard[row][col];

      // Don't reveal flagged cells or already revealed cells or if game is not in playing state
      if (cell.isFlagged || cell.revealed || state.gameStatus !== 'playing') {
        return state;
      }

      // Handle first click - ensure it's never a mine
      if (state.firstClick) {
        // If first click is a mine, regenerate the board without a mine at this position
        if (cell.isMine) {
          // Create a new board
          updatedBoard = generateBoard(
            state.difficulty.width,
            state.difficulty.height,
            state.difficulty.mines
          );

          // Make sure this position doesn't have a mine
          while (updatedBoard[row][col].isMine) {
            updatedBoard = generateBoard(
              state.difficulty.width,
              state.difficulty.height,
              state.difficulty.mines
            );
          }
        }

        // Apply the cell reveal to the board (either original or regenerated)
        updatedBoard = revealCell(updatedBoard, row, col);

        return {
          ...state,
          board: updatedBoard,
          firstClick: false,
        };
      }

      // Normal click (not first) - check if clicked on a mine
      if (cell.isMine) {
        // Reveal all mines and mark as game over
        const revealedBoard = updatedBoard.map(boardRow =>
          boardRow.map(boardCell => ({
            ...boardCell,
            revealed: boardCell.revealed || boardCell.isMine
          }))
        );

        return {
          ...state,
          board: revealedBoard,
          // gameStatus: 'lost',
          isTimerRunning: false
        };
      }

      // Reveal the clicked cell and its neighbors
      updatedBoard = revealCell(updatedBoard, row, col);

      // Check for win condition
      const totalCells = state.difficulty.width * state.difficulty.height;
      const revealedCells = updatedBoard.flat().filter(c => c.revealed).length;
      const totalNonMineCells = totalCells - state.difficulty.mines;

      // Win if all non-mine cells are revealed
      if (revealedCells === totalNonMineCells) {
        // Flag all mines automatically on win
        const winBoard = updatedBoard.map(boardRow =>
          boardRow.map(boardCell => ({
            ...boardCell,
            isFlagged: !boardCell.revealed && boardCell.isMine ? true : boardCell.isFlagged
          }))
        );

        return {
          ...state,
          board: winBoard,
          // gameStatus: 'won',
          isTimerRunning: false,
          flagsPlaced: state.difficulty.mines // All mines are flagged automatically
        };
      }

      // Regular move, just update the board
      return {
        ...state,
        board: updatedBoard
      };


    case 'TOGGLE_FLAG':
      // Placeholder - this will be implemented with flagging logic
      return state;

    case 'INCREMENT_TIMER':
      return {
        ...state,
        timer: state.timer + 1
      };

    case 'SET_GAME_STATUS':
      return {
        ...state,
        gameStatus: action.payload,
        isTimerRunning: action.payload === 'playing'
      };

    default:
      return state;
  }
};

export const GameProvider = ({ children }) => {
    const [state, dispatch] = useReducer(gameReducer, initialState);

    // set game start
    useEffect(() => {
      if (state.difficulty ) {
        dispatch({ type: 'START_GAME' });

        const clickHandler = (e) => {
          dispatch( { type: 'PLAYING_GAME' });
        };

        document.querySelector("#board > div > div").addEventListener('click', clickHandler);

        return () => {
          document.querySelector("#board > div > div").removeEventListener('click', clickHandler);
        }

      }
    }, [state.difficulty, state.gameStatus]);

    return (
      <GameContext.Provider value={{ state, dispatch }}>
        {children}
      </GameContext.Provider>
    );
  };