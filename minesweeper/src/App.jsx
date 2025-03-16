import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { GameProvider } from './context/GameProvider'
import ControlPanel from './components/ControlPanel/ControlPanel'
import Board from './components/Board/Board'
function App() {

  return (
    <div id='App'>
      <GameProvider>
        <div id='heading container'>
          <h1 id='title'>MINESWEEPER</h1>
        </div>
        <div id='control-panel'>
          <ControlPanel></ControlPanel>
        </div>
        <div id='board'>
          <Board></Board>
        </div>
        <footer><p>Yixuan Chen, Anlin Ma &copy; 2025</p></footer>
      </GameProvider>
    </div>
  )
}

export default App
