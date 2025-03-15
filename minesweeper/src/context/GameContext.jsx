// Manages the game state across components
import React, { createContext, useReducer, useEffect } from 'react';
import { DIFFICULTIES } from '../constants/difficulties';
import { generateBoard } from '../utils/boardGenerator';

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
        isTimerRunning: true,
        firstClick: true
      };

    case 'RESTART_GAME':
      return {
        ...state,
        board: generateBoard(state.difficulty.width, state.difficulty.height, state.difficulty.mines),
        gameStatus: 'playing',
        flagsPlaced: 0,
        timer: 0,
        isTimerRunning: true,
        firstClick: true
      };

    case 'SET_DIFFICULTY':
      return {
        ...state,
        difficulty: action.payload,
        gameStatus: 'idle'
      };

    case 'REVEAL_CELL':
      // Placeholder - this will be implemented with cell reveal logic
      return state;

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

// Create context
export const GameContext = createContext();

// Context provider component
export const GameProvider = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  // Start a new game when difficulty changes
  useEffect(() => {
    if (state.difficulty && state.gameStatus === 'idle') {
      dispatch({ type: 'START_GAME' });
    }
  }, [state.difficulty, state.gameStatus]);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};
