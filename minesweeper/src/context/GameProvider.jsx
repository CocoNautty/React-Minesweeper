// Manages the game state across components
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
        const [show, setShow] = useState(true);
        const [items, setItems] = useState([]);
        const [loading, setLoading] = useState(false);
        const [error, setError] = useState(null);
        const handleClose = () => setShow(false);
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>You Win!</Modal.Title>
          </Modal.Header>
          <Modal.Body><h3>Do you want to record your score?</h3>
            <form>
              <fieldset>
                <legend>Winner Info</legend>

                <label for="name_id">Your Name</label>
                <input type="text" placeholder="Enter Your Name" id="name_id" name="name" ></input>
                <label for="score_id">Your Score</label>
                <input type="text" id="score_id" name="score" >{ }</input>

                <input type="submit" value="Record my score"></input>
              </fieldset>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              No.
            </Button>
          </Modal.Footer>
        </Modal>
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