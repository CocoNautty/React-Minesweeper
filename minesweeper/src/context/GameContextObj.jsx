/**
 * @file GameContextObj.jsx
 * @description
 * - Creates and exports the GameContext using React's Context API.
 * - The context is used to share game state across the application without prop drilling.
 */

import { createContext } from 'react';

/**
 * GameContext provides a shared context for managing game state.
 * 
 * - This context will store information such as game status, timer, difficulty level, and grid data.
 * - Any component wrapped in this context provider can access and update the game state.
 *
 * @constant
 * @type {React.Context}
 * @default {Object} An empty context, to be populated by a provider component.
 */

import { createContext } from 'react';

const GameContext = createContext();

export default GameContext;
