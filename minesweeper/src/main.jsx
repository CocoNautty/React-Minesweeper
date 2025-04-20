import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

/**
 * Entry point for the React application.
 *
 * - Applies React's StrictMode to highlight potential issues during development.
 * - Renders the root <App /> component into the DOM element with id="root".
 * 
 * @file This file initializes the React app and mounts it to the DOM.
 */

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
