/**
 * @file GameProvider.jsx
 * @description
 * - Manages the game state using React's `useReducer` hook.
 * - Handles game logic for starting, restarting, revealing cells, flagging, and checking win/loss conditions.
 * - Provides the game state and dispatch function via `GameContext`.
 * - Integrates with `generateBoard` and `cellReveal` utilities for board generation and cell updates.
 */

import React, { useReducer, useEffect } from 'react';
import { DIFFICULTIES } from '../constants/difficulties';
import { generateBoard } from '../utils/boardGenerator';
import { revealCell } from '../utils/cellReveal';
import GameContext from './GameContextObj';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';


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

/**
 * gameReducer manages state transitions for the Minesweeper game.
 *
 * @param {Object} state - The current game state.
 * @param {Object} action - The action object that modifies the state.
 * @returns {Object} The updated game state.
 */

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
      return {
        ...state,
        isTimerRunning: true
      };

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

    case 'REVEAL_CELL': {
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
          gameStatus: 'lost',
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
          gameStatus: 'won',
          isTimerRunning: false,
          flagsPlaced: state.difficulty.mines // All mines are flagged automatically
        };
      }

      // Regular move, just update the board
      return {
        ...state,
        board: updatedBoard
      };
    }

    case 'TOGGLE_FLAG': {
      const { row, col } = action.payload;

      // Don't allow flagging if game isn't in progress or if the cell is already revealed
      if (state.gameStatus !== 'playing' || state.board[row][col].revealed) {
        return state;
      }

      // Create a copy of the board
      const updatedBoard = state.board.map(r => [...r]);

      // Toggle the flag on the clicked cell
      const cell = updatedBoard[row][col];
      const isFlagged = !cell.isFlagged;
      updatedBoard[row][col] = { ...cell, isFlagged };

      // Update flag count
      const flagsPlaced = state.flagsPlaced + (isFlagged ? 1 : -1);

      // Optional: Check if all mines are correctly flagged
      const allMinesFlagged = updatedBoard.flat().every(
        cell => cell.isMine ? cell.isFlagged : true
      );

      const allNonMineRevealed = updatedBoard.flat().every(
        cell => !cell.isMine ? cell.revealed : true
      );

      // Win if all mines are flagged and all non-mine cells are revealed
      // This is an alternative win condition that some Minesweeper variants use
      let gameStatus = state.gameStatus;
      let isTimerRunning = state.isTimerRunning;

      if (allMinesFlagged && allNonMineRevealed) {
        gameStatus = 'won';
        isTimerRunning = false;
      }

      return {
        ...state,
        board: updatedBoard,
        flagsPlaced,
        gameStatus,
        isTimerRunning
      };
    }

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

/**
 * GameProvider component manages and provides the game state using the `useReducer` hook.
 *
 * - Wraps the app in the `GameContext.Provider` to share game state and dispatch function.
 * - Handles the initial game setup, state transitions, and side effects like handling clicks.
 * - Initializes the game board and provides functions to start, restart, and change difficulty.
 *
 * @component
 * @param {Object} children - The components that consume the game context.
 * @returns {JSX.Element} The GameContext provider wrapping the child components.
 */

export const GameProvider = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  // set game start
  useEffect(() => {
    if (state.difficulty) {

      if (state.gameStatus === 'idle') {
        dispatch({ type: 'START_GAME' });
      }

      const clickHandler = (e) => {
        if (state.gameStatus !== 'playing') {
          return;
        }
        dispatch({ type: 'PLAYING_GAME' });
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